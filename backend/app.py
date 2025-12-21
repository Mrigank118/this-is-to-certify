from flask import Flask, request, send_file, jsonify
from generator import generate_certificate
import zipfile, os, csv
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

UPLOADS = "uploads"
OUTPUT = "output"
FONTS = "fonts"

os.makedirs(UPLOADS, exist_ok=True)
os.makedirs(OUTPUT, exist_ok=True)

@app.route("/generate", methods=["POST"])
def generate():
    template = request.files["template"]
    csv_file = request.files["csv"]

    x = int(float(request.form["x"]))
    y = int(float(request.form["y"]))


    font_size = int(request.form["fontSize"])
    color = list(map(int, request.form["color"].split(",")))
    font = request.form["font"]

    template_path = os.path.join(UPLOADS, template.filename)
    csv_path = os.path.join(UPLOADS, csv_file.filename)

    template.save(template_path)
    csv_file.save(csv_path)

    zip_path = os.path.join(OUTPUT, "certificates.zip")
    zipf = zipfile.ZipFile(zip_path, "w")

    with open(csv_path, newline='', encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            name = row["Name"]
            out = os.path.join(OUTPUT, f"{name}.pdf")
            generate_certificate(
                name,
                template_path,
                out,
                f"{FONTS}/{font}",
                font_size,
                color,
                x,
                y
            )
            zipf.write(out, arcname=f"{name}.pdf")

    zipf.close()
    return send_file(zip_path, as_attachment=True)

app.run(port=5000, debug=True)
