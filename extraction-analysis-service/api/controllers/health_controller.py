from flask import jsonify, request
from services.seo_service import SeoService
from services.mobile_service import MobileService
from services.performance_service import PerformanceService
from services.accessibility_service import AccessibilityService
from services.llm_service import LLMService
from services.site_service import SiteService

def register_health_routes(app):
    """Register health check routes"""
    
    @app.route('/')
    def home():
        return jsonify({
            "status": "success",
            "message": "Website Evaluation API Service is running",
            "version": "1.0.0"
        })
    
    # Test endpoint for SiteService remains unchanged
    @app.route('/api/test/site-service', methods=['POST'])
    def test_site_service():
        """Test endpoint for SiteService"""
        data = request.json
        if not data or 'url' not in data:
            return jsonify({"error": "URL is required"}), 400
            
        url = data['url']
        service = SiteService()
        
        # Test specific function or all
        function = data.get('function', 'all')
        
        if function == 'fetch_html':
            result = service.fetch_html(url)
        elif function == 'capture_screenshot':
            result = service.capture_screenshot(url)
        else:  # Default to full evaluation
            result = service.evaluate_site(url)
            
        return jsonify({
            "status": "success",
            "service": "SiteService",
            "function": function,
            "result": result
        })
    
    @app.route('/api/test/seo-service', methods=['POST'])
    def test_seo_service():
        """Test endpoint for SEOService"""
        data = request.json
        if not data or 'url' not in data:
            return jsonify({"error": "URL is required"}), 400
            
        url = data.get('url', 'https://example.com')
        # If html content is not provided, fetch it using SiteService
        html_content = data.get('html', '')
        if not html_content:
            site_service = SiteService()
            html_result = site_service.fetch_html(url)
            html_content = html_result.get("html", "")
        
        service = SeoService()
        result = service.analyze(html_content, url)
            
        return jsonify({
            "status": "success",
            "service": "SeoService",
            "result": result
        })
    
    @app.route('/api/test/mobile-service', methods=['POST'])
    def test_mobile_service():
        """Test endpoint for MobileService"""
        data = request.json
        if not data or 'url' not in data:
            return jsonify({"error": "URL is required"}), 400
            
        url = data.get('url', 'https://example.com')
        # Auto-fetch html content if missing
        html_content = data.get('html', '')
        if not html_content:
            site_service = SiteService()
            html_result = site_service.fetch_html(url)
            html_content = html_result.get("html", "")
            
        screenshot = data.get('screenshot', '')
        if not screenshot:
            site_service = SiteService()
            screenshot_result = site_service.capture_screenshot(url)
            screenshot = screenshot_result.get("screenshot", "")
            
        service = MobileService()
        result = service.analyze(html_content, screenshot, url)
            
        return jsonify({
            "status": "success",
            "service": "MobileService",
            "result": result
        })
    
    @app.route('/api/test/performance-service', methods=['POST'])
    def test_performance_service():
        """Test endpoint for PerformanceService"""
        data = request.json
        if not data or 'url' not in data:
            return jsonify({"error": "URL is required"}), 400
            
        url = data.get('url', 'https://example.com')
        html_content = data.get('html', '')
        if not html_content:
            site_service = SiteService()
            html_result = site_service.fetch_html(url)
            html_content = html_result.get("html", "")
            
        service = PerformanceService()
        result = service.analyze(html_content, url)
            
        return jsonify({
            "status": "success",
            "service": "PerformanceService",
            "result": result
        })
    
    @app.route('/api/test/accessibility-service', methods=['POST'])
    def test_accessibility_service():
        """Test endpoint for AccessibilityService"""
        data = request.json
        if not data or 'url' not in data:
            return jsonify({"error": "URL is required"}), 400
            
        url = data.get('url', 'https://example.com')
        html_content = data.get('html', '')
        if not html_content:
            site_service = SiteService()
            html_result = site_service.fetch_html(url)
            html_content = html_result.get("html", "")
            
        service = AccessibilityService()
        result = service.analyze(html_content, url)
            
        return jsonify({
            "status": "success",
            "service": "AccessibilityService",
            "result": result
        })
    
    @app.route('/api/test/llm-service', methods=['POST'])
    def test_llm_service():
        """Test endpoint for LLMService"""
        data = request.json
        if not data or 'url' not in data:
            return jsonify({"error": "URL is required"}), 400
            
        url = data.get('url', 'https://example.com')
        # For LLM testing, auto-fetch missing html content and screenshot
        html_content = data.get('html', '')
        screenshot = data.get('screenshot', '')
        if not html_content or not screenshot:
            site_service = SiteService()
            if not html_content:
                html_content = site_service.fetch_html(url)
            if not screenshot:
                screenshot = site_service.capture_screenshot(url)
                
        # Optional previous analyses
        seo_analysis = data.get('seo_analysis', {})
        mobile_analysis = data.get('mobile_analysis', {})
        performance_analysis = data.get('performance_analysis', {})
        accessibility_analysis = data.get('accessibility_analysis', {})
        
        service = LLMService()
        result = service.analyze(
            html_content, 
            screenshot, 
            url, 
            seo_analysis, 
            mobile_analysis,
            performance_analysis,
            accessibility_analysis
        )
            
        return jsonify({
            "status": "success",
            "service": "LLMService",
            "result": result
        })