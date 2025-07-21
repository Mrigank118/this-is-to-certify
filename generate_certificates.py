from PIL import Image, ImageDraw, ImageFont
import os
import csv

# === CONFIGURATION ===
TEMPLATE_PATH = "certificate_template.png"
FONT_PATH = "Amsterdam Four_ttf 400.ttf"
OUTPUT_FOLDER = "certificates_pdf"
FONT_SIZE = 60
TEXT_COLOR = (0, 0, 0)  # black
TEXT_Y = 520
CSV_FILE = "names.csv"

# Read names from CSV
names = []
with open(CSV_FILE, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        if row.get("Name"):
            names.append(row["Name"].strip())

# Create output directory if not exists
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# Load font
font = ImageFont.truetype(FONT_PATH, FONT_SIZE)

# Generate certificates
for name in names:
    cert = Image.open(TEMPLATE_PATH).convert("RGB")
    draw = ImageDraw.Draw(cert)

    CENTER_X = cert.width // 2
    draw.text((CENTER_X, TEXT_Y), name, fill=TEXT_COLOR, font=font, anchor="mm")

    safe_name = name.replace(" ", "_")
    cert.save(os.path.join(OUTPUT_FOLDER, f"{safe_name}.pdf"), "PDF")

print("✅ PDF certificates generated from CSV!")
