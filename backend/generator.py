from PIL import Image, ImageDraw, ImageFont

def generate_certificate(
    name, template_path, output_path,
    font_path, font_size, color, x, y
):
    img = Image.open(template_path).convert("RGB")
    draw = ImageDraw.Draw(img)
    font = ImageFont.truetype(font_path, font_size)

    draw.text((x, y), name, fill=tuple(color), font=font, anchor="mm")
    img.save(output_path, "PDF")
