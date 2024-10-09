import sys
import json
from Models.region_mongo import RegionMongo

file_path = 'Datas/a-reg2021.json'
nosql = RegionMongo()

with open(file_path, mode='r', encoding='utf-8') as file:
    data = json.load(file)

nosql.saveDatas(data.get('features', []))

nosql.destroy()

if __name__ == '__main__':
    sys.exit()
