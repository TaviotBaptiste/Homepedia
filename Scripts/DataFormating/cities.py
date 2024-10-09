import os
import re
import sys
import glob
import json
from Models.cities_mongo import CitiesMongo

file_path = 'Datas/Cities/'
files_types = 'communes-*.geojson'
nosql = CitiesMongo()

json_files = glob.glob(os.path.join(file_path, files_types))

for json_file in json_files:
    with open(json_file, mode='r', encoding='utf-8') as file:
        data = json.load(file)

    match = re.search(r'communes-(.*?)-', json_file)

    print(match)

    cities = data.get('features', [])

    for city in cities:
        city["properties"]["dep"] = match.group(1)

    nosql.saveDatas(cities)

nosql.destroy()

if __name__ == '__main__':
    sys.exit()
