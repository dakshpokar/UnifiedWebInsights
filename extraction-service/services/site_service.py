import requests
import asyncio
from playwright.async_api import async_playwright
import base64
import os
from datetime import datetime


class SiteService:
    def __init__(self):
        # Configure headers to mimic a browser request
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        }
    
    def fetch_html(self, url):
        """
        Fetch the HTML content of a given URL
        """
        try:
            response = requests.get(url, headers=self.headers, timeout=30)
            response.raise_for_status()
            
            return {
                'status': 'success',
                'html': response.text,
                'status_code': response.status_code,
                'headers': dict(response.headers),
                'url': response.url,  # Final URL after any redirects
                'timestamp': datetime.utcnow().isoformat()
            }
        
        except requests.exceptions.RequestException as e:
            return {
                'status': 'error',
                'error': str(e),
                'timestamp': datetime.utcnow().isoformat()
            }
    
    async def capture_screenshot_async(self, url):
        """
        Capture a screenshot of the given URL using Playwright
        Returns a base64 encoded image
        """
        try:
            async with async_playwright() as p:
                browser = await p.chromium.launch()
                context = await browser.new_context(
                    viewport={'width': 1280, 'height': 800}
                )
                page = await context.new_page()
                
                # Navigate to the URL with timeout of 30 seconds
                await page.goto(url, wait_until='networkidle', timeout=30000)
                
                # Wait a bit for any lazy-loaded content
                await asyncio.sleep(2)
                
                # Take a screenshot
                screenshot_bytes = await page.screenshot(full_page=True)
                
                # Convert screenshot to base64 for easier transport/storage
                screenshot_base64 = base64.b64encode(screenshot_bytes).decode('utf-8')
                
                await browser.close()
                
                return {
                    'status': 'success',
                    'screenshot': screenshot_base64,
                    'timestamp': datetime.utcnow().isoformat()
                }
        
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e),
                'timestamp': datetime.utcnow().isoformat()
            }
    
    def capture_screenshot(self, url):
        """
        Synchronous wrapper for the async screenshot capture function
        """
        return asyncio.run(self.capture_screenshot_async(url))
    
    def evaluate_site(self, url):
        """
        Get both HTML and screenshot for a URL
        """
        html_result = self.fetch_html(url)
        screenshot_result = self.capture_screenshot(url)
        
        result = {
            'url': url,
            'timestamp': datetime.utcnow().isoformat(),
            'html': html_result,
            'screenshot': screenshot_result
        }
        
        return result
