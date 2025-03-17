from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
import concurrent.futures
from api.routes import register_routes
from config.mongodb import init_db
from utils.json_encoder import CustomJSONEncoder

# Load environment variables
load_dotenv()

def create_app(test_config=None):
    """Application factory pattern for Flask"""
    app = Flask(__name__)
    
    # Configure app
    app.config.from_mapping(
        SECRET_KEY=os.environ.get('SECRET_KEY', 'dev'),
        MONGODB_URI=os.environ.get('MONGODB_URI', 'mongodb://localhost:27017/'),
        MAX_WORKERS=int(os.environ.get('MAX_WORKERS', 10)),
        DEBUG=os.environ.get('FLASK_ENV', 'production') == 'development',
    )
    
    # Override config with test config if provided
    if test_config:
        app.config.update(test_config)
    
    # Set up CORS
    CORS(app)
    
    # Initialize executor for background tasks
    app.executor = concurrent.futures.ThreadPoolExecutor(
        max_workers=app.config['MAX_WORKERS']
    )
    
    # Set up custom JSON encoder
    app.json_encoder = CustomJSONEncoder
    
    # Initialize database
    app.db = init_db(app.config['MONGODB_URI'])
    
    # Register all routes
    register_routes(app)
    
    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get('PORT', 4100))
    
    # In production, we should use a WSGI server like gunicorn
    if app.config['DEBUG']:
        app.run(host='0.0.0.0', port=port, debug=True)
    else:
        # For development simplicity
        app.run(host='0.0.0.0', port=port, threaded=True)