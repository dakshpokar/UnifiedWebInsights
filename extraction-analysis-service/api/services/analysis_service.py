from bson.objectid import ObjectId
from datetime import datetime
import concurrent.futures
from services.site_service import SiteService
from services.seo_service import SeoService
from services.mobile_service import MobileService
from services.performance_service import PerformanceService
from services.accessibility_service import AccessibilityService
from services.llm_service import LLMService

class AnalysisService:
    """Service to coordinate all analysis tasks"""
    
    def __init__(self):
        # Initialize all analysis services
        self.site_service = SiteService()
        self.seo_service = SeoService()
        self.mobile_service = MobileService() 
        self.performance_service = PerformanceService()
        self.accessibility_service = AccessibilityService()
        self.llm_service = LLMService()
    
    def analyze_site_background(self, url, evaluation_id, user_id, evaluations_collection):
        """
        Performs all analyses in background after initial request
        
        Args:
            url: Website URL to analyze
            evaluation_id: MongoDB ObjectId of the evaluation record
            user_id: Optional user ID
            evaluations_collection: MongoDB collection for evaluations
        """
        try:
            # Get base site data (HTML and screenshot)
            site_data = self.site_service.evaluate_site(url)
            
            # Add user ID if provided
            if user_id:
                site_data['userId'] = user_id
                
            # Update the evaluation with full site data
            evaluations_collection.update_one(
                {"_id": ObjectId(evaluation_id)},
                {"$set": site_data}
            )
            
            # Get HTML and screenshot for analysis
            html_data = site_data.get('html', {})
            html_content = html_data.get('html', '')
            screenshot_data = site_data.get('screenshot', {})
            screenshot = screenshot_data.get('screenshot', '')
            
            # Run all analyses concurrently
            with concurrent.futures.ThreadPoolExecutor() as executor:
                # Start all analyses tasks
                seo_future = executor.submit(self.seo_service.analyze, html_content, url)
                mobile_future = executor.submit(self.mobile_service.analyze, html_content, screenshot, url)
                performance_future = executor.submit(self.performance_service.analyze, html_content, url)
                accessibility_future = executor.submit(self.accessibility_service.analyze, html_content, url)
                
                # Get results as they complete
                seo_analysis = seo_future.result()
                mobile_analysis = mobile_future.result()
                performance_analysis = performance_future.result()
                accessibility_analysis = accessibility_future.result()
                
                # Run LLM analysis with all other results
                llm_analysis = self.llm_service.analyze(
                    html_content,
                    screenshot,
                    url,
                    seo_analysis,
                    mobile_analysis,
                    performance_analysis,
                    accessibility_analysis
                )
                
                # Update the evaluation with all analysis results
                evaluations_collection.update_one(
                    {"_id": ObjectId(evaluation_id)},
                    {"$set": {
                        "seo_analysis": seo_analysis,
                        "mobile_analysis": mobile_analysis,
                        "performance_analysis": performance_analysis,
                        "accessibility_analysis": accessibility_analysis,
                        "llm_analysis": llm_analysis,
                        "analysis_complete": True,
                        "analysis_timestamp": datetime.utcnow().isoformat()
                    }}
                )
                
        except Exception as e:
            # Log error and update evaluation with error status
            print(f"Error in background analysis: {str(e)}")
            evaluations_collection.update_one(
                {"_id": ObjectId(evaluation_id)},
                {"$set": {
                    "analysis_error": str(e),
                    "analysis_complete": False
                }}
            )