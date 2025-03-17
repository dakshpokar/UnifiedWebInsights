from pymongo import MongoClient

def init_db(mongo_uri):
    """Initialize MongoDB connection and return database"""
    client = MongoClient(mongo_uri)
    db = client.site_evaluator
    
    # Ensure indexes for better query performance
    db.evaluations.create_index("userId")
    db.evaluations.create_index("url")
    
    return db