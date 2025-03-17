from bs4 import BeautifulSoup
from datetime import datetime
import re
from urllib.parse import urlparse, urljoin

class PerformanceService:
    def __init__(self):
        self.data = {}

    def analyze(self, html_content, url):
        """
        Analyze performance aspects of a website.

        Args:
            html_content (str): The HTML content of the page.
            url (str): URL of the page.

        Returns:
            dict: Performance analysis results.
        """
        # Start timer
        start_time = datetime.utcnow()

        # Create BeautifulSoup object
        soup = BeautifulSoup(html_content, 'html.parser')
        parsed_url = urlparse(url)
        base_url = f"{parsed_url.scheme}://{parsed_url.netloc}"

        # Calculate HTML size
        html_size = len(html_content)
        html_size_kb = html_size / 1024

        # Count resources by type
        stylesheets = soup.find_all('link', rel='stylesheet')
        scripts = soup.find_all('script', src=True)
        images = soup.find_all('img', src=True)
        iframes = soup.find_all('iframe')

        # Collect render-blocking resources
        render_blocking = []
        head = soup.find('head')
        if head:
            for css in head.find_all('link', rel='stylesheet'):
                if not css.get('media') or css.get('media') == 'all':
                    render_blocking.append({
                        'type': 'css',
                        'url': css.get('href')
                    })
            for script in head.find_all('script', src=True):
                if not script.get('async') and not script.get('defer'):
                    render_blocking.append({
                        'type': 'js',
                        'url': script.get('src')
                    })

        # Lazy loading check for images
        lazy_loaded_images = 0
        for img in images:
            if img.get('loading') == 'lazy' or img.get('data-src') or img.get('data-srcset'):
                lazy_loaded_images += 1

        # Check for minification in JS and CSS files
        has_minified_js = self._check_minification(scripts, 'src')
        has_minified_css = self._check_minification(stylesheets, 'href')

        # Total resource count
        total_resources = len(stylesheets) + len(scripts) + len(images) + len(iframes)

        # End timer for performance analysis
        end_time = datetime.utcnow()
        execution_time = (end_time - start_time).total_seconds()

        # Prepare heuristic scoring
        issues = []
        performance_score = 100

        if html_size_kb > 100:
            issues.append({
                "severity": "medium",
                "message": f"HTML document is large ({html_size_kb:.1f}KB)."
            })
            performance_score -= 5

        if total_resources > 50:
            issues.append({
                "severity": "high",
                "message": f"High number of resources detected ({total_resources})."
            })
            performance_score -= 10
        elif total_resources > 30:
            issues.append({
                "severity": "medium",
                "message": f"Too many resources detected ({total_resources})."
            })
            performance_score -= 5

        if render_blocking:
            issues.append({
                "severity": "high",
                "message": f"{len(render_blocking)} render-blocking resources detected."
            })
            performance_score -= len(render_blocking) * 2

        if len(images) > 3 and lazy_loaded_images == 0:
            issues.append({
                "severity": "medium",
                "message": "No images use lazy loading."
            })
            performance_score -= 5

        if not has_minified_js:
            issues.append({
                "severity": "medium",
                "message": "JavaScript files are not minified."
            })
            performance_score -= 5

        if not has_minified_css:
            issues.append({
                "severity": "medium",
                "message": "CSS files are not minified."
            })
            performance_score -= 5

        performance_score = max(0, min(100, performance_score))

        if performance_score >= 90:
            performance_rating = "Excellent"
        elif performance_score >= 80:
            performance_rating = "Good"
        elif performance_score >= 60:
            performance_rating = "Fair"
        elif performance_score >= 40:
            performance_rating = "Poor"
        else:
            performance_rating = "Very Poor"

        return {
            "timestamp": datetime.utcnow().isoformat(),
            "execution_time": execution_time,
            "html_size_kb": round(html_size_kb, 2),
            "resource_counts": {
                "stylesheets": len(stylesheets),
                "scripts": len(scripts),
                "images": len(images),
                "iframes": len(iframes)
            },
            "total_resources": total_resources,
            "render_blocking_count": len(render_blocking),
            "lazy_loaded_images": lazy_loaded_images,
            "minified_js": has_minified_js,
            "minified_css": has_minified_css,
            "score": performance_score,
            "rating": performance_rating,
            "issues": issues
        }

    def _check_minification(self, elements, attr):
        """
        Check if resources are considered minified based on their file names.

        Args:
            elements (list): List of BeautifulSoup elements (e.g., <script> or <link> tags).
            attr (str): Attribute name containing the resource URL (usually 'src' or 'href').

        Returns:
            bool: True if all resources appear minified, False otherwise.
        """
        for element in elements:
            url = element.get(attr, "")
            # Heuristic: Check if '.min.' exists in the file name
            if ".min." not in url:
                return False
        return True