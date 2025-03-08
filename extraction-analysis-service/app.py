from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv
import os
import json
from datetime import datetime
from services.site_service import SiteService  # Import our new service

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB Connection
mongo_uri = os.environ.get('MONGODB_URI')
client = MongoClient(mongo_uri)
db = client.site_evaluator  # Database name

# Collections
evaluations = db.evaluations
users = db.users

# Initialize our site service
site_service = SiteService()

# JSON encoder to handle ObjectId and datetime
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, datetime):
            return o.isoformat()
        return json.JSONEncoder.default(self, o)

app.json_encoder = JSONEncoder

# Routes
@app.route('/')
def home():
    return jsonify({
        "status": "success",
        "message": "Flask API Service is running"
    })

@app.route('/api/evaluate', methods=['POST'])
def evaluate_site():
    data = request.json
    
    if not data or 'url' not in data:
        return jsonify({"error": "URL is required"}), 400
    
    url = data['url']
    user_id = data.get('userId')  
    
    # Use our new service to evaluate the site
    evaluation_result = site_service.evaluate_site(url)
    
    # Store the evaluation result in MongoDB
    if user_id:
        evaluation_result['userId'] = user_id
        
    result = evaluations.insert_one(evaluation_result)
    evaluation_result['_id'] = str(result.inserted_id)
    
    # @Mehul right now the data is stored in mongo as base64 string
    # Check evaluate_site function in site_service and use that as necessary.
    # For now we just have to complete this API, evaluate_site after which I will be 
    # consuming the URLs from RabbitMQ or Kafka Queue.
    # Once you have processed the current URL we will just push it to mongodb with the same object id 
    # as received for this request.

    response_result = {
        "status": "success",
        "evaluationId": str(result.inserted_id),
        "url": url,
        "timestamp": evaluation_result['timestamp']
    }

    return jsonify(response_result)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
