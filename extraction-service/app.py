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
    
    # Return the result
    # Note: we may want to exclude the full HTML and/or screenshot from the response
    # to reduce payload size, especially if the client doesn't need them immediately
    response_result = {
        "status": "success",
        "evaluationId": str(result.inserted_id),
        "url": url,
        "timestamp": evaluation_result['timestamp']
    }

    return jsonify(response_result)

@app.route('/api/evaluations/<id>', methods=['GET'])
def get_evaluation(id):
    try:
        evaluation = evaluations.find_one({"_id": ObjectId(id)})
        if not evaluation:
            return jsonify({"error": "Evaluation not found"}), 404
        
        return jsonify(evaluation)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/evaluations', methods=['GET'])
def get_evaluations():
    try:
        user_id = request.args.get('userId')
        query = {"userId": user_id} if user_id else {}
        
        # Exclude large fields from initial listing to improve performance
        projection = {"html.html": 0, "screenshot.screenshot": 0}
        
        results = list(evaluations.find(query, projection).sort("timestamp", -1))
        return jsonify(results)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
