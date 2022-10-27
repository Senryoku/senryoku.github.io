import os
import json
import fileinput
from shutil import copy, rmtree

from pathlib import Path
from PIL import Image


def convert_to_webp(source):

    return destination


for ext in ["png", "jpg", "jpeg"]:
    paths = Path("data/img").glob(f"**/*.{ext}")
    for path in paths:
        destination = path.with_suffix(".webp")
        if not os.path.isfile(destination):
            image = Image.open(path)
            image.save(destination, format="webp")
            print(f"Created: {destination}")

# Makes sure every folder in path exists


def mkdir_p(path):
    path = os.path.dirname(path)
    if(not os.path.isdir(path)):
        os.makedirs(path)


def list_files(path):
    return [f for f in os.listdir(path) if os.path.isfile(os.path.join(path, f))]


pages = list_files('data/pages')
with open('template/header.html', encoding='utf8') as header, open('template/footer.html', encoding='utf8') as footer:
    for page in pages:
        header.seek(0)
        footer.seek(0)
        with open('data/pages/' + page, encoding='utf8') as content, open(page, 'w', encoding='utf8') as output:
            output.write(header.read())
            output.write(content.read())
            output.write(footer.read())
        print("Wrote " + page)
