import json
import os
from pathlib import Path

# Get the directory of the current script
script_dir = Path.cwd()

CATEGORIES_FILE = f"{script_dir}/categories.json"

def load_categories() -> None:
    categories = []
    with open(CATEGORIES_FILE, 'r') as file:
        categories = json.load(file)
    return categories

def update_categories(data:list) -> None:

    if os.path.isfile(CATEGORIES_FILE):
        os.remove(CATEGORIES_FILE)
    with open(CATEGORIES_FILE, "w") as file:
        json.dump(data, file, indent=4)

