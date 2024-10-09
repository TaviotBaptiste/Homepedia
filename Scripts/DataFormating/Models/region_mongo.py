import os
import pymongo
from dotenv import load_dotenv

load_dotenv()


class RegionMongo:
    def __init__(self):
        mongo_collection = os.getenv('NOSQL_REGION_COLLECTION')

        self.client = pymongo.MongoClient(
            f"mongodb://{os.getenv('USER')}:{os.getenv('PASSWORD')}@{os.getenv('HOST')}:{os.getenv('NOSQL_PORT')}/")
        db = self.client[os.getenv('DATABASE_NAME')]

        if mongo_collection not in db.list_collection_names():
            db.create_collection(mongo_collection)
            collection = db[mongo_collection]
            collection.create_index([("properties.reg", pymongo.ASCENDING)])

        self.mongo = db[mongo_collection]

    def saveDatas(self, documents):
        self.mongo.insert_many(documents)

    def destroy(self):
        self.client.close()
