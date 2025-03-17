from api.controllers.evaluation_controller import register_evaluation_routes
from api.controllers.analysis_controller import register_analysis_routes
from api.controllers.health_controller import register_health_routes

def register_routes(app):
    """Register all API routes"""
    register_health_routes(app)
    register_evaluation_routes(app)
    register_analysis_routes(app)