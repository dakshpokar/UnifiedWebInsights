from flask import jsonify
from bson.objectid import ObjectId

def register_analysis_routes(app):
    """Register routes for different types of analysis"""
    
    @app.route('/api/seo/<evaluation_id>', methods=['GET'])
    def get_seo_analysis(evaluation_id):
        try:
            evaluation = app.db.evaluations.find_one({"_id": ObjectId(evaluation_id)})
            if not evaluation:
                return jsonify({"error": "Evaluation not found"}), 404
            
            # Check if analysis exists
            if 'seo_analysis' not in evaluation:
                return jsonify({
                    "status": "pending",
                    "message": "SEO analysis is not yet complete"
                }), 202
            
            return jsonify({
                "status": "success",
                "evaluationId": evaluation_id,
                "seoAnalysis": evaluation['seo_analysis']
            })
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @app.route('/api/mobile/<evaluation_id>', methods=['GET'])
    def get_mobile_analysis(evaluation_id):
        try:
            evaluation = app.db.evaluations.find_one({"_id": ObjectId(evaluation_id)})
            if not evaluation:
                return jsonify({"error": "Evaluation not found"}), 404
            
            # Check if analysis exists
            if 'mobile_analysis' not in evaluation:
                return jsonify({
                    "status": "pending",
                    "message": "Mobile friendliness analysis is not yet complete"
                }), 202
            
            return jsonify({
                "status": "success",
                "evaluationId": evaluation_id,
                "mobileAnalysis": evaluation['mobile_analysis']
            })
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @app.route('/api/performance/<evaluation_id>', methods=['GET'])
    def get_performance_analysis(evaluation_id):
        try:
            evaluation = app.db.evaluations.find_one({"_id": ObjectId(evaluation_id)})
            if not evaluation:
                return jsonify({"error": "Evaluation not found"}), 404
            
            # Check if analysis exists
            if 'performance_analysis' not in evaluation:
                return jsonify({
                    "status": "pending",
                    "message": "Performance analysis is not yet complete"
                }), 202
            
            return jsonify({
                "status": "success",
                "evaluationId": evaluation_id,
                "performanceAnalysis": evaluation['performance_analysis']
            })
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @app.route('/api/accessibility/<evaluation_id>', methods=['GET'])
    def get_accessibility_analysis(evaluation_id):
        try:
            evaluation = app.db.evaluations.find_one({"_id": ObjectId(evaluation_id)})
            if not evaluation:
                return jsonify({"error": "Evaluation not found"}), 404
            
            # Check if analysis exists
            if 'accessibility_analysis' not in evaluation:
                return jsonify({
                    "status": "pending",
                    "message": "Accessibility analysis is not yet complete"
                }), 202
            
            return jsonify({
                "status": "success",
                "evaluationId": evaluation_id,
                "accessibilityAnalysis": evaluation['accessibility_analysis']
            })
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @app.route('/api/llm-improvements/<evaluation_id>', methods=['GET'])
    def get_llm_improvements(evaluation_id):
        try:
            evaluation = app.db.evaluations.find_one({"_id": ObjectId(evaluation_id)})
            if not evaluation:
                return jsonify({"error": "Evaluation not found"}), 404
            
            # Check if analysis exists
            if 'llm_analysis' not in evaluation:
                return jsonify({
                    "status": "pending",
                    "message": "LLM-based improvement analysis is not yet complete"
                }), 202
            
            return jsonify({
                "status": "success",
                "evaluationId": evaluation_id,
                "llmAnalysis": evaluation['llm_analysis']
            })
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @app.route('/api/full-report/<evaluation_id>', methods=['GET'])
    def get_full_report(evaluation_id):
        try:
            evaluation = app.db.evaluations.find_one({"_id": ObjectId(evaluation_id)})
            if not evaluation:
                return jsonify({"error": "Evaluation not found"}), 404
            
            # Check if all analyses are complete
            all_analyses = ['seo_analysis', 'mobile_analysis', 
                           'performance_analysis', 'accessibility_analysis', 
                           'llm_analysis']
            
            missing_analyses = [analysis for analysis in all_analyses if analysis not in evaluation]
            
            if missing_analyses:
                pending_analyses = ", ".join(a.replace("_analysis", "") for a in missing_analyses)
                return jsonify({
                    "status": "pending",
                    "message": f"Some analyses are not yet complete: {pending_analyses}",
                    "completedAnalyses": [a for a in all_analyses if a in evaluation],
                    "pendingAnalyses": missing_analyses
                }), 202
            
            # Return the full report with all analyses
            return jsonify({
                "status": "success",
                "evaluationId": evaluation_id,
                "url": evaluation['url'],
                "timestamp": evaluation['timestamp'],
                "analysisComplete": True,
                "seoAnalysis": evaluation.get('seo_analysis', {}),
                "mobileAnalysis": evaluation.get('mobile_analysis', {}),
                "performanceAnalysis": evaluation.get('performance_analysis', {}),
                "accessibilityAnalysis": evaluation.get('accessibility_analysis', {}),
                "llmAnalysis": evaluation.get('llm_analysis', {})
            })
        except Exception as e:
            return jsonify({"error": str(e)}), 500