from pathlib import Path
from PIL import Image, ImageDraw, ImageEnhance, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "empire-castle.png"
OUTPUT = ROOT / "public" / "og-image.png"
SIZE = (1200, 630)

# Reuse the actual Empire SMP keep image, cropped for Open Graph's 1.91:1 ratio.
photo = Image.open(SOURCE).convert("RGB")
ratio = max(SIZE[0] / photo.width, SIZE[1] / photo.height)
resized = photo.resize((round(photo.width * ratio), round(photo.height * ratio)), Image.Resampling.LANCZOS)
left = (resized.width - SIZE[0]) // 2
upper = max(0, round((resized.height - SIZE[1]) * 0.46))
card = resized.crop((left, upper, left + SIZE[0], upper + SIZE[1]))
card = ImageEnhance.Brightness(card).enhance(0.76)
card = ImageEnhance.Color(card).enhance(0.88).convert("RGBA")

# Deepen the left side for clear, legible type while keeping the castle visible.
overlay = Image.new("RGBA", SIZE, (0, 0, 0, 0))
pixels = overlay.load()
for x in range(SIZE[0]):
    strength = max(0, min(1, (980 - x) / 740))
    alpha = round(235 * strength**1.5)
    for y in range(SIZE[1]):
        pixels[x, y] = (40, 16, 25, alpha)
card = Image.alpha_composite(card, overlay)
draw = ImageDraw.Draw(card)

GEORGIA = Path(r"C:\Windows\Fonts\georgia.ttf")
GEORGIA_BOLD = Path(r"C:\Windows\Fonts\georgiab.ttf")
SEGOE_BOLD = Path(r"C:\Windows\Fonts\seguisb.ttf")
SEGOE = Path(r"C:\Windows\Fonts\segoeui.ttf")

def font(path, size):
    return ImageFont.truetype(str(path), size=size)

# Restrained double frame echoes the site's gold-edged royal palette.
gold = (226, 188, 113, 235)
draw.rectangle((23, 23, 1176, 606), outline=(226, 188, 113, 150), width=2)
draw.rectangle((31, 31, 1168, 598), outline=(226, 188, 113, 80), width=1)

# A compact, bespoke shield mark: crowned keep in the Empire colors.
shield = [(111, 67), (159, 83), (159, 126), (151, 151), (135, 169), (111, 184), (87, 169), (71, 151), (63, 126), (63, 83)]
draw.polygon(shield, fill=(87, 29, 40, 255), outline=(235, 198, 125, 255), width=4)
inner = [(111, 76), (151, 88), (151, 125), (144, 146), (130, 161), (111, 174), (92, 161), (78, 146), (71, 125), (71, 88)]
draw.line(inner + [inner[0]], fill=(235, 198, 125, 175), width=2)
# Crown
crown = [(88, 94), (98, 101), (111, 84), (124, 101), (134, 94), (130, 111), (92, 111)]
draw.polygon(crown, fill=(244, 215, 157, 255))
# Keep tower and gate
draw.rectangle((88, 123, 134, 151), fill=(240, 214, 160, 255))
draw.rectangle((83, 116, 94, 131), fill=(240, 214, 160, 255))
draw.rectangle((105, 112, 117, 131), fill=(240, 214, 160, 255))
draw.rectangle((128, 116, 139, 131), fill=(240, 214, 160, 255))
draw.rectangle((105, 135, 117, 151), fill=(87, 29, 40, 255))

# Exact, high-contrast type is rendered here instead of baked into generated artwork.
draw.text((190, 69), "EMPIRE", font=font(GEORGIA_BOLD, 73), fill=(248, 237, 211, 255), stroke_width=0)
draw.text((196, 145), "S M P", font=font(SEGOE_BOLD, 18), fill=(231, 191, 112, 255))
draw.text((82, 236), "A GRIEFABLE MINECRAFT SURVIVAL WORLD", font=font(SEGOE_BOLD, 16), fill=(242, 209, 142, 255), stroke_width=0)
draw.text((78, 275), "Build your own", font=font(GEORGIA, 76), fill=(248, 237, 211, 255), stroke_width=1, stroke_fill=(34, 16, 20, 150))
draw.text((78, 365), "kingdom.", font=font(GEORGIA, 92), fill=(242, 209, 142, 255), stroke_width=1, stroke_fill=(34, 16, 20, 150))
draw.line((82, 493, 528, 493), fill=(226, 188, 113, 220), width=2)
draw.text((82, 516), "SURVIVE  ·  BUILD  ·  RISK IT", font=font(SEGOE_BOLD, 19), fill=(248, 237, 211, 255))
draw.text((82, 555), "theempiresmp.play.hosting", font=font(SEGOE, 16), fill=(226, 215, 198, 255))

card.convert("RGB").save(OUTPUT, format="PNG", optimize=True)
print(f"Created {OUTPUT} ({SIZE[0]}x{SIZE[1]})")
