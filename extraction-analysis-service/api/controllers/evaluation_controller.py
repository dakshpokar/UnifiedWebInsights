from flask import request, jsonify
from bson.objectid import ObjectId
from datetime import datetime
from api.services.analysis_service import AnalysisService
from utils.queue_publisher import publish_evaluation   

def register_evaluation_routes(app):
    """Register routes for website evaluation"""
    
    analysis_service = AnalysisService()
    
    @app.route('/api/evaluate', methods=['POST'])
    def evaluate_site():
        data = request.json
        
        if not data or 'url' not in data:
            return jsonify({"error": "URL is required"}), 400
        
        url = data['url']
        user_id = data.get('userId')  
        
        # Create initial record
        initial_record = {
            "url": url,
            "timestamp": datetime.utcnow().isoformat(),
            "status": "processing"
        }
        
        if user_id:
            initial_record['userId'] = user_id
        
        # Insert initial record to get an ID
        result = app.db.evaluations.insert_one(initial_record)
        evaluation_id = str(result.inserted_id)
        
        # Publish the evaluation message to RabbitMQ so that a consumer could process this task
        # publish_evaluation(evaluation_id, url, user_id)
        
        # Start background analysis via thread pool as before
        app.executor.submit(
            analysis_service.analyze_site_background,
            url, 
            evaluation_id, 
            user_id,
            app.db.evaluations
        )
        
        # Return immediately with the evaluation ID
        return jsonify({
            "status": "success",
            "message": "Evaluation started",
            "evaluationId": evaluation_id,
            "url": url,
            "timestamp": initial_record['timestamp']
        })