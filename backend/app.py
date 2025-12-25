from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import os, csv, zipfile, uuid

from generator import generate_certificate

# -------------------------------
# Paths
# -------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

UPLOADS = os.path.join(BASE_DIR, "uploads")
OUTPUT = os.path.join(BASE_DIR, "output")
FONTS = os.path.join(BASE_DIR, "fonts")

os.makedirs(UPLOADS, exist_ok=True)
os.makedirs(OUTPUT, exist_ok=True)
os.makedirs(FONTS, exist_ok=True)

# -------------------------------
# App
# -------------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# Globals (single-session MVP)
# -------------------------------
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

# -------------------------------
# Upload template
# -------------------------------
@app.post("/api/upload/template")
async def upload_template(file: UploadFile = File(...)):
    global template_path
    template_path = os.path.join(UPLOADS, file.filename)

    with open(template_path, "wb") as f:
        f.write(await file.read())

    return {"status": "ok"}

# -------------------------------
# Upload CSV
# -------------------------------
@app.post("/api/upload/csv")
async def upload_csv(file: UploadFile = File(...)):
    global csv_path
    csv_path = os.path.join(UPLOADS, file.filename)

    with open(csv_path, "wb") as f:
        f.write(await file.read())

    return {"status": "ok"}

# -------------------------------
# Generate certificates
# -------------------------------
@app.post("/api/generate")
async def generate(
    x: float = Form(...),          # ratio (0–1)
    y: float = Form(...),          # ratio (0–1)
    font: str = Form(...),
    fontSize: float = Form(...),   # ratio
    color: str = Form(...),
):
    if not template_path or not csv_path:
        raise HTTPException(status_code=400, detail="Template or CSV missing")

    # -------------------------------
    # Resolve font
    # -------------------------------
    if font.startswith("custom-"):
        font_file = font.replace("custom-", "") + ".ttf"
    else:
        font_file = FONT_MAP.get(font)

    if not font_file:
        raise HTTPException(status_code=400, detail="Unknown font")

    font_path = os.path.join(FONTS, font_file)
    if not os.path.exists(font_path):
        raise HTTPException(status_code=400, detail="Font file not found")

    # -------------------------------
    # Color
    # -------------------------------
    try:
        rgb = tuple(map(int, color.split(",")))
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid color format")

    # -------------------------------
    # Convert ratios → real pixels
    # -------------------------------
    img = Image.open(template_path)
    img_width, img_height = img.size

    real_x = int(x * img_width)
    real_y = int(y * img_height)
    real_font_size = max(10, int(fontSize * img_width))

    # -------------------------------
    # Job setup
    # -------------------------------
    job_id = str(uuid.uuid4())
    job_dir = os.path.join(OUTPUT, job_id)
    os.makedirs(job_dir, exist_ok=True)

    zip_path = os.path.join(job_dir, "certificates.zip")

    # -------------------------------
    # Generate PDFs
    # -------------------------------
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
        with open(csv_path, newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)

            if "Name" not in reader.fieldnames:
                raise HTTPException(status_code=400, detail="CSV must contain 'Name' column")

            for row in reader:
                name = row["Name"].strip()
                pdf_path = os.path.join(job_dir, f"{name}.pdf")

                generate_certificate(
                    name=name,
                    template_path=template_path,
                    output_path=pdf_path,
                    font_path=font_path,
                    font_size=real_font_size,
                    color=rgb,
                    x=real_x,
                    y=real_y,
                )

                zipf.write(pdf_path, arcname=f"{name}.pdf")

    return {
        "status": "done",
        "jobId": job_id
    }

# -------------------------------
# Download ZIP
# -------------------------------
@app.get("/api/download/{job_id}")
async def download(job_id: str):
    zip_path = os.path.join(OUTPUT, job_id, "certificates.zip")

    if not os.path.exists(zip_path):
        raise HTTPException(status_code=404, detail="Invalid job ID")

    return FileResponse(
        zip_path,
        media_type="application/zip",
        filename="certificates.zip",
        headers={
            "Cache-Control": "no-store"
        }
    )
