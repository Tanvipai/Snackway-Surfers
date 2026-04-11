from rembg import remove
from PIL import Image

input_path = 'public/img/cart page/shopchar.png'
output_path = 'public/img/cart page/shopchar_nobg.png'

print("Processing image...")
try:
    input_image = Image.open(input_path)
    output_image = remove(input_image)
    output_image.save(output_path)
    print("Done!")
except Exception as e:
    print(f"Error: {e}")
