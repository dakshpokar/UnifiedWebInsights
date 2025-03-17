from bs4 import BeautifulSoup
from datetime import datetime
from urllib.parse import urlparse, urljoin
import re

class SeoService:
    """Service to analyze SEO aspects of a website robustly"""

    def analyze(self, html_content, url):
        """
        Analyze SEO aspects of a website robustly for modern frameworks.
        
        Args:
            html_content (str): HTML content of the page (preferably rendered HTML).
            url (str): URL of the page.
            
        Returns:
            dict: SEO analysis results.
        """
        try:
            start_time = datetime.utcnow()
            soup = BeautifulSoup(html_content, 'html.parser')

            # Parse the URL details
            parsed_url = urlparse(url)
            base_url = f"{parsed_url.scheme}://{parsed_url.netloc}"

            # Get title: try <title> first, then Open Graph if missing
            title = soup.title.text.strip() if soup.title and soup.title.text.strip() else None
            if not title:
                og_title_tag = soup.find('meta', property='og:title')
                if og_title_tag and og_title_tag.get('content'):
                    title = og_title_tag['content'].strip()
            title_length = len(title) if title else 0

            # Get meta description: try standard meta then Open Graph description
            meta_description = None
            desc_tag = soup.find('meta', attrs={'name': 'description'})
            if desc_tag and desc_tag.get('content'):
                meta_description = desc_tag['content'].strip()
            else:
                og_desc_tag = soup.find('meta', property='og:description')
                if og_desc_tag and og_desc_tag.get('content'):
                    meta_description = og_desc_tag['content'].strip()
            meta_description_length = len(meta_description) if meta_description else 0

            # Get headings
            h1_tags = soup.find_all('h1')
            h2_tags = soup.find_all('h2')
            h3_tags = soup.find_all('h3')

            # Check for canonical URL
            canonical_url = None
            canonical_tag = soup.find('link', attrs={'rel': 'canonical'})
            if canonical_tag and canonical_tag.get('href'):
                canonical_url = canonical_tag['href'].strip()
                if not canonical_url.startswith(('http://', 'https://')):
                    canonical_url = urljoin(base_url, canonical_url)

            # Check for robots meta tag
            robots_content = None
            robots_tag = soup.find('meta', attrs={'name': re.compile('robots', re.I)})
            if robots_tag and robots_tag.get('content'):
                robots_content = robots_tag['content'].strip()

            # Check for structured data
            structured_data_count = len(soup.find_all('script', attrs={'type': 'application/ld+json'}))

            # Check for image alt text
            images = soup.find_all('img')
            images_with_alt = [img for img in images if img.get('alt') and img.get('alt').strip()]
            images_without_alt = [img for img in images if not (img.get('alt') and img.get('alt').strip())]

            # Check for broken links (simplified)
            links = soup.find_all('a', href=True)
            internal_links = []
            external_links = []
            for link in links:
                href = link['href'].strip()
                if href.startswith(('#', 'javascript:', 'mailto:')):
                    continue
                if not href.startswith(('http://', 'https://')):
                    href = urljoin(base_url, href)
                if urlparse(href).netloc == parsed_url.netloc:
                    internal_links.append(href)
                else:
                    external_links.append(href)

            # Check meta viewport for responsiveness
            has_viewport = False
            viewport_tag = soup.find('meta', attrs={'name': 'viewport'})
            if viewport_tag and viewport_tag.get('content'):
                has_viewport = True

            # Calculate word count (approximate)
            text_content = soup.get_text(separator=' ', strip=True)
            word_count = len(re.findall(r'\b\w+\b', text_content))

            end_time = datetime.utcnow()
            execution_time = (end_time - start_time).total_seconds()

            # Prepare analysis result variables
            seo_issues = []
            seo_score = 100

            # Title checks
            if not title:
                seo_issues.append({"severity": "high", "message": "Page is missing a title tag."})
                seo_score -= 15
            elif title_length < 30:
                seo_issues.append({"severity": "medium", "message": "Title is too short (less than 30 characters)."})
                seo_score -= 5
            elif title_length > 60:
                seo_issues.append({"severity": "medium", "message": "Title is too long (more than 60 characters)."})
                seo_score -= 5

            # Meta description checks
            if not meta_description:
                seo_issues.append({"severity": "medium", "message": "Missing meta description."})
                seo_score -= 10
            elif meta_description_length < 100:
                seo_issues.append({"severity": "low", "message": "Meta description is too short (less than 100 characters)."})
                seo_score -= 3
            elif meta_description_length > 160:
                seo_issues.append({"severity": "low", "message": "Meta description is too long (more than 160 characters)."})
                seo_score -= 3

            # Headings check
            if not h1_tags:
                seo_issues.append({"severity": "high", "message": "Missing H1 heading."})
                seo_score -= 10
            elif len(h1_tags) > 1:
                seo_issues.append({"severity": "medium", "message": f"Multiple H1 tags found: {len(h1_tags)}."})
                seo_score -= 5

            # Image alt text check
            if images and images_without_alt:
                seo_issues.append({"severity": "medium", "message": f"{len(images_without_alt)} of {len(images)} images lack alt text."})
                seo_score -= min(10, len(images_without_alt))

            # Canonical URL check
            if not canonical_url:
                seo_issues.append({"severity": "low", "message": "Missing canonical URL."})
                seo_score -= 3

            # Viewport check for mobile-friendliness
            if not has_viewport:
                seo_issues.append({"severity": "medium", "message": "Missing viewport meta tag for mobile-friendliness."})
                seo_score -= 8

            # Content length check
            if word_count < 300:
                seo_issues.append({"severity": "medium", "message": f"Thin content detected ({word_count} words)."})
                seo_score -= 7

            seo_score = max(0, min(100, seo_score))
            if seo_score >= 90:
                seo_rating = "Excellent"
            elif seo_score >= 80:
                seo_rating = "Good"
            elif seo_score >= 60:
                seo_rating = "Fair"
            elif seo_score >= 40:
                seo_rating = "Poor"
            else:
                seo_rating = "Very Poor"

            return {
                "timestamp": datetime.utcnow().isoformat(),
                "execution_time": execution_time,
                "score": seo_score,
                "rating": seo_rating,
                "title": {"text": title, "length": title_length},
                "meta_description": {"text": meta_description, "length": meta_description_length},
                "headings": {
                    "h1_count": len(h1_tags),
                    "h1_text": [h1.get_text(strip=True) for h1 in h1_tags],
                    "h2_count": len(h2_tags),
                    "h3_count": len(h3_tags)
                },
                "images": {"total": len(images), "with_alt": len(images_with_alt), "without_alt": len(images_without_alt)},
                "links": {"internal_count": len(internal_links), "external_count": len(external_links)},
                "canonical_url": canonical_url,
                "robots": robots_content,
                "structured_data_count": structured_data_count,
                "has_viewport": has_viewport,
                "word_count": word_count,
                "issues": seo_issues
            }
        except Exception as e:
            print(f"Error analyzing SEO: {str(e)}")
            return {
                "timestamp": datetime.utcnow().isoformat(),
                "error": str(e),
                "score": 0,
                "rating": "Error",
                "issues": [{"severity": "critical", "message": f"Error analyzing SEO: {str(e)}"}]
            }