from bs4 import BeautifulSoup
from datetime import datetime
import re

class MobileService:
    """Service to analyze mobile-friendliness of a website"""
    
    def analyze(self, html_content, screenshot, url):
        """
        Analyze mobile friendliness of a website
        
        Args:
            html_content: HTML content of the page
            screenshot: Base64 encoded screenshot of the page (optional)
            url: URL of the page
            
        Returns:
            dict: Mobile-friendliness analysis results
        """
        try:
            # Starting timestamp
            start_time = datetime.utcnow()
            
            soup = BeautifulSoup(html_content, 'html.parser')
            
            # Check for viewport meta tag
            has_viewport = False
            viewport_content = None
            viewport_tag = soup.find('meta', attrs={'name': 'viewport'})
            if viewport_tag and 'content' in viewport_tag.attrs:
                has_viewport = True
                viewport_content = viewport_tag['content']
            
            # Check for responsive design
            is_responsive = self._check_responsive_design(soup, viewport_content)
            
            # Check for touch elements (buttons, links) size and spacing
            touch_elements_issues = self._check_touch_elements(soup)
            
            # Check for font sizes
            font_size_issues = self._check_font_sizes(soup)
            
            # Check for mobile-friendly frameworks (Bootstrap, Foundation, etc.)
            uses_responsive_framework = self._check_responsive_frameworks(soup)
            
            # Check if page uses flash (not mobile-friendly)
            uses_flash = len(soup.find_all('object', attrs={'type': 'application/x-shockwave-flash'})) > 0
            
            # Finish timestamp
            end_time = datetime.utcnow()
            execution_time = (end_time - start_time).total_seconds()
            
            # Prepare analysis results
            issues = []
            mobile_score = 100  # Start with perfect score and subtract for issues
            
            # Viewport check
            if not has_viewport:
                issues.append({
                    "severity": "high",
                    "message": "Page is missing a viewport meta tag"
                })
                mobile_score -= 20
            elif viewport_content and 'user-scalable=no' in viewport_content:
                issues.append({
                    "severity": "medium",
                    "message": "Page prevents users from zooming, which hinders accessibility"
                })
                mobile_score -= 10
                
            # Responsive design check
            if not is_responsive:
                issues.append({
                    "severity": "high",
                    "message": "Page does not appear to use responsive design techniques"
                })
                mobile_score -= 15
                
            # Touch elements check
            issues.extend(touch_elements_issues)
            mobile_score -= len(touch_elements_issues) * 5
            
            # Font size check
            issues.extend(font_size_issues)
            mobile_score -= len(font_size_issues) * 5
            
            # Flash check
            if uses_flash:
                issues.append({
                    "severity": "high",
                    "message": "Page uses Flash, which is not supported on most mobile devices"
                })
                mobile_score -= 20
                
            # Cap score between 0 and 100
            mobile_score = max(0, min(100, mobile_score))
            
            # Generate mobile-friendliness rating
            if mobile_score >= 90:
                mobile_rating = "Excellent"
            elif mobile_score >= 80:
                mobile_rating = "Good"
            elif mobile_score >= 60:
                mobile_rating = "Fair"
            elif mobile_score >= 40:
                mobile_rating = "Poor"
            else:
                mobile_rating = "Very Poor"
                
            # Compile the results
            return {
                "timestamp": datetime.utcnow().isoformat(),
                "execution_time": execution_time,
                "score": mobile_score,
                "rating": mobile_rating,
                "viewport": {
                    "present": has_viewport,
                    "content": viewport_content
                },
                "responsive_design": is_responsive,
                "uses_responsive_framework": uses_responsive_framework,
                "uses_flash": uses_flash,
                "issues": issues
            }
            
        except Exception as e:
            print(f"Error analyzing mobile-friendliness: {str(e)}")
            return {
                "timestamp": datetime.utcnow().isoformat(),
                "error": str(e),
                "score": 0,
                "rating": "Error",
                "issues": [{
                    "severity": "critical",
                    "message": f"Error analyzing mobile-friendliness: {str(e)}"
                }]
            }
    
    def _check_responsive_design(self, soup, viewport_content):
        """Check if the page uses responsive design techniques"""
        # Check for media queries in style tags
        has_media_queries = False
        for style in soup.find_all('style'):
            if style.string and '@media' in style.string:
                has_media_queries = True
                break
                
        # Check for media attributes in link tags
        for link in soup.find_all('link', rel='stylesheet'):
            if link.get('media') and ('screen' in link.get('media') or 'max-width' in link.get('media')):
                has_media_queries = True
                break
                
        # Check for common responsive framework classes
        responsive_classes = [
            'container', 'row', 'col', 'hidden-xs', 'visible-md',
            'flex', 'grid', 'sm:', 'md:', 'lg:' # Tailwind classes
        ]
        
        has_responsive_classes = False
        for class_name in responsive_classes:
            elements = soup.find_all(class_=re.compile(class_name))
            if elements:
                has_responsive_classes = True
                break
                
        # Check viewport content for width=device-width
        has_device_width = viewport_content and 'width=device-width' in viewport_content
                
        return has_media_queries or has_responsive_classes or has_device_width
    
    def _check_touch_elements(self, soup):
        """Check if touch elements (buttons, links) are large enough and well-spaced"""
        issues = []
        
        # This is a simplified approach - ideally we would analyze CSS and rendered size
        # Find links and buttons with small dimensions
        small_touch_elements = 0
        
        for element in soup.find_all(['a', 'button']):
            # Check for inline width and height
            width = element.get('width')
            height = element.get('height')
            
            if width and height:
                try:
                    # Convert to integers (removing 'px' if present)
                    width_val = int(width.replace('px', '')) if 'px' in width else int(width)
                    height_val = int(height.replace('px', '')) if 'px' in height else int(height)
                    
                    if width_val < 44 or height_val < 44:
                        small_touch_elements += 1
                except (ValueError, TypeError):
                    # Can't parse the dimensions
                    pass
                    
        if small_touch_elements > 0:
            issues.append({
                "severity": "medium",
                "message": f"Found {small_touch_elements} touch elements that may be too small for mobile users"
            })
            
        # Real implementation would analyze CSS more thoroughly
                
        return issues
    
    def _check_font_sizes(self, soup):
        """Check if font sizes are readable on mobile devices"""
        issues = []
        
        # Look for font-size in inline styles
        small_fonts = 0
        for element in soup.find_all(style=True):
            style = element.get('style', '')
            font_size_match = re.search(r'font-size\s*:\s*(\d+)px', style)
            if font_size_match:
                size = int(font_size_match.group(1))
                if size < 14:  # Too small for mobile readability
                    small_fonts += 1
                    
        # Check for small font tags
        small_fonts += len(soup.find_all('font', size=lambda s: s and int(s) < 3))
            
        if small_fonts > 0:
            issues.append({
                "severity": "medium",
                "message": f"Found {small_fonts} instances of font sizes that may be too small for mobile devices"
            })
            
        return issues
    
    def _check_responsive_frameworks(self, soup):
        """Check if the page uses a responsive design framework"""
        # Look for common framework signatures
        frameworks = {
            'Bootstrap': [
                'bootstrap.css', 'bootstrap.min.css', 'class="container"', 'class="row"', 'class="col'
            ],
            'Foundation': [
                'foundation.css', 'foundation.min.css', 'class="small-'
            ],
            'Tailwind': [
                'tailwind.css', 'class="sm:', 'class="md:', 'class="lg:'
            ],
            'Bulma': [
                'bulma.css', 'bulma.min.css', 'class="column"', 'class="columns"'
            ],
            'Materialize': [
                'materialize.css', 'materialize.min.css', 'class="container"', 'class="row"'
            ]
        }
        
        page_html = str(soup)
        detected_frameworks = []
        
        for framework, signatures in frameworks.items():
            for signature in signatures:
                if signature in page_html:
                    detected_frameworks.append(framework)
                    break
        
        return bool(detected_frameworks)