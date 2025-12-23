from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import os, csv, zipfile
from generator import generate_certificate

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

UPLOADS = os.path.join(BASE_DIR, "uploads")
OUTPUT = os.path.join(BASE_DIR, "output")
FONTS = os.path.join(BASE_DIR, "fonts")

os.makedirs(UPLOADS, exist_ok=True)
os.makedirs(OUTPUT, exist_ok=True)
os.makedirs(FONTS, exist_ok=True)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

template_path: str | None = None
csv_path: str | None = None

FONT_MAP = {
    "arial": "arial.ttf",
    "times-new-roman": "TimesNewRoman.ttf",
    "georgia": "Georgia.ttf",
    "helvetica": "Helvetica.ttf",
    "courier-new": "CourierNew.ttf",
    "verdana": "Verdana.ttf",
    "palatino": "Palatino.ttf",
    "garamond": "Garamond.ttf",
}

# 1️⃣ Upload certificate template
@app.post("/api/upload/template")
async def upload_template(file: UploadFile = File(...)):
    global template_path
    template_path = os.path.join(UPLOADS, file.filename)

    with open(template_path, "wb") as f:
        f.write(await file.read())

    return {"status": "ok", "filename": file.filename}

# 2️⃣ Upload CSV
@app.post("/api/upload/csv")
async def upload_csv(file: UploadFile = File(...)):
    global csv_path
    csv_path = os.path.join(UPLOADS, file.filename)

    with open(csv_path, "wb") as f:
        f.write(await file.read())

    return {"status": "ok", "filename": file.filename}

# 3️⃣ Generate certificates
@app.post("/api/generate")
async def generate(
    x: float = Form(...),
    y: float = Form(...),
    font: str = Form(...),
    fontSize: int = Form(...),
    color: str = Form(...),
):
    if not template_path or not csv_path:
        raise HTTPException(status_code=400, detail="Template or CSV missing")

    # 🔹 Resolve font safely
    if font.startswith("custom-"):
        font_file = font.replace("custom-", "") + ".ttf"
    else:
        font_file = FONT_MAP.get(font)

    if not font_file:
        raise HTTPException(status_code=400, detail=f"Unknown font: {font}")

    font_path = os.path.join(FONTS, font_file)

    if not os.path.exists(font_path):
        raise HTTPException(status_code=400, detail=f"Font file not found: {font_file}")

    try:
        rgb = tuple(map(int, color.split(",")))
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid color format")

    zip_path = os.path.join(OUTPUT, "certificates.zip")

    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
        with open(csv_path, newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)

            if "Name" not in reader.fieldnames:
                raise HTTPException(status_code=400, detail="CSV must contain 'Name' column")

            for row in reader:
                name = row["Name"].strip()
                out_pdf = os.path.join(OUTPUT, f"{name}.pdf")

                generate_certificate(
                    name=name,
                    template_path=template_path,
                    output_path=out_pdf,
                    font_path=font_path,
                    font_size=fontSize,
                    color=rgb,
                    x=x,
                    y=y,
                )

                zipf.write(out_pdf, arcname=f"{name}.pdf")

    return {"status": "done"}

# 4️⃣ Download ZIP
@app.get("/api/download")
async def download():
    zip_path = os.path.join(OUTPUT, "certificates.zip")

    if not os.path.exists(zip_path):
        raise HTTPException(status_code=404, detail="No certificates generated yet")

    return FileResponse(
        zip_path,
        media_type="application/zip",
        filename="certificates.zip",
    )
