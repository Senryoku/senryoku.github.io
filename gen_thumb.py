import os
import sys
import glob
from PIL import Image, ImageOps

#Config
prefix = "thumb_"
thumbnail_size = 200, 200
		
def list_files(path):
	return [f for f in os.listdir(path) if os.path.isfile(os.path.join(path, f))]

# Generates Thumbnails if not already present
def gen_thumbnail(path):
	dir, name = os.path.split(path);
	full_thumb_path = os.path.join(dir, prefix + name);
	print("Generating thumbnail:", full_thumb_path)
	if os.path.isfile(path) and not os.path.isfile(full_thumb_path):
		with Image.open(path) as im:
			im = ImageOps.fit(im, thumbnail_size, Image.ANTIALIAS)
			im.save(full_thumb_path, optimize=True, quality=95)
	return

for p in glob.glob(sys.argv[1]):
	gen_thumbnail(p)
