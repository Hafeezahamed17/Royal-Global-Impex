import os
from PIL import Image

# 🔧 SETTINGS
INPUT_FOLDER = "assests"      # folder with original images
OUTPUT_FOLDER = "compressed_images"  # folder for compressed images
TARGET_SIZE_KB = 500               # target size per image

os.makedirs(OUTPUT_FOLDER, exist_ok=True)

def compress_image(input_path, output_path, target_kb):
    img = Image.open(input_path)

    # Convert PNG with transparency to RGB
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")

    quality = 95  # start high

    while quality > 10:
        img.save(output_path, "JPEG", quality=quality, optimize=True)
        size_kb = os.path.getsize(output_path) / 1024

        if size_kb <= target_kb:
            break

        quality -= 5

    print(f"✔ {os.path.basename(input_path)} → {int(size_kb)} KB")

# 🔁 LOOP THROUGH FOLDER
for file in os.listdir(INPUT_FOLDER):
    if file.lower().endswith((".jpg", ".jpeg", ".png")):
        input_file = os.path.join(INPUT_FOLDER, file)
        output_file = os.path.join(OUTPUT_FOLDER, file)  # SAME NAME
        compress_image(input_file, output_file, TARGET_SIZE_KB)

print("\n✅ Image compression completed!")
