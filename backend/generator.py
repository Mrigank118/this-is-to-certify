from PIL import Image, ImageDraw, ImageFont

def generate_certificate(
    name: str,
    template_path: str,
    output_path: str,
    font_path: str,
    font_size: int,
    color: tuple,
    x: float,
    y: float,
):
    image = Image.open(template_path).convert("RGB")
    draw = ImageDraw.Draw(image)
    font = ImageFont.truetype(font_path, font_size)

    draw.text(
        (x, y),
        name,
        fill=color,
        font=font,
        anchor="mm"
    )

    image.save(output_path, "PDF")
