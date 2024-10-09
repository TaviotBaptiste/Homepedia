import sys
import json
from Models.department_mongo import DepartmentMongo

file_path = 'Datas/a-dep2021.json'
nosql = DepartmentMongo()

with open(file_path, mode='r', encoding='utf-8') as file:
    data = json.load(file)

nosql.saveDatas(data.get('features', []))

nosql.destroy()

if __name__ == '__main__':
    sys.exit()
