import os
import json
import pymongo
from dotenv import load_dotenv

load_dotenv()


class AddressMongo:
    def __init__(self):
        mongo_collection = os.getenv('NOSQL_ADDRESS_COLLECTION')

        self.client = pymongo.MongoClient(
            f"mongodb://{os.getenv('USER')}:{os.getenv('PASSWORD')}@{os.getenv('HOST')}:{os.getenv('NOSQL_PORT')}/")
        db = self.client[os.getenv('DATABASE_NAME')]

        if mongo_collection not in db.list_collection_names():
            db.create_collection(mongo_collection)
            collection = db[mongo_collection]
            collection.create_index([("lat", pymongo.ASCENDING), ("lon", pymongo.ASCENDING)])

        self.mongo = db[mongo_collection]

    def formatSaveData(self, data):
        documents = [eval(map_item) for map_item in map(lambda x: json.dumps({
            "key": x[0],
            "label": x[1],
            "lat": x[2],
            "lon": x[3]
        }), data)]

        self.mongo.insert_many(documents)

    def destroy(self):
        self.client.close()
