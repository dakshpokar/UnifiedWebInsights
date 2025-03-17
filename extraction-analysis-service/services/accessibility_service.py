from bs4 import BeautifulSoup
from datetime import datetime

class AccessibilityService:
    """
    Service to analyze accessibility aspects of a website based on WCAG guidelines.
    """

    def analyze(self, html_content, url):
        """
        Analyze accessibility aspects of a website.

        Args:
            html_content (str): HTML content of the page.
            url (str): URL of the page.

        Returns:
            dict: Accessibility analysis results.
        """
        start_time = datetime.utcnow()
        soup = BeautifulSoup(html_content, 'html.parser')
        issues = []
        score = 100

        # 1. Language attribute on <html> (WCAG 3.1.1)
        html_tag = soup.find('html')
        lang = html_tag.get('lang') if html_tag else None
        if not lang:
            issues.append({
                "severity": "high",
                "message": "The <html> tag is missing a 'lang' attribute."
            })
            score -= 15

        # 2. Images should have alt text (WCAG 1.1.1)
        images = soup.find_all('img')
        total_images = len(images)
        images_missing_alt = [img for img in images if not img.get('alt', '').strip()]
        if total_images > 0:
            percent_missing = (len(images_missing_alt) / total_images) * 100
            if percent_missing > 20:
                issues.append({
                    "severity": "medium",
                    "message": f"{len(images_missing_alt)} out of {total_images} images are missing alt text."
                })
                score -= 10

        # 3. Form elements should have associated labels (WCAG 1.3.1 & 2.5.3)
        forms = soup.find_all('form')
        form_issue_count = 0
        for form in forms:
            inputs = form.find_all(['input', 'select', 'textarea'])
            for input_elem in inputs:
                input_id = input_elem.get('id')
                label = None
                if input_id:
                    label = form.find('label', attrs={'for': input_id})
                if not label:
                    # Alternatively, check if input is wrapped by a label
                    parent = input_elem.find_parent('label')
                    if parent:
                        label = parent
                if not label:
                    form_issue_count += 1

        if form_issue_count > 0:
            issues.append({
                "severity": "medium",
                "message": f"{form_issue_count} form elements are missing associated labels."
            })
            score -= 10

        # 4. Landmark and semantic elements (WCAG 2.4.1)
        landmarks = {
            "header": soup.find('header'),
            "nav": soup.find('nav'),
            "main": soup.find('main'),
            "footer": soup.find('footer'),
            "aside": soup.find('aside')
        }
        missing_landmarks = [key for key, val in landmarks.items() if not val]
        if missing_landmarks:
            issues.append({
                "severity": "low",
                "message": f"Missing landmark/semantic regions: {', '.join(missing_landmarks)}."
            })
            score -= 5 * len(missing_landmarks)

        # 5. Ensure sufficient color contrast and readable text is more complex;
        # Here, we simply check if <body> contains a significant amount of text.
        body = soup.find('body')
        if body:
            text_content = body.get_text(strip=True)
            if len(text_content) < 200:  # Example heuristic
                issues.append({
                    "severity": "low",
                    "message": "Page has very little text, which may affect content comprehension."
                })
                score -= 5

        # 6. ARIA roles on interactive elements (best practice, not a strict WCAG requirement)
        aria_elements = soup.find_all(attrs={"role": True})
        if not aria_elements:
            issues.append({
                "severity": "low",
                "message": "No ARIA roles found. Consider using ARIA where semantic HTML is insufficient."
            })
            # Not subtracting heavily since semantic HTML might be used.

        # Bound score between 0 and 100
        score = max(0, min(100, score))
        if score >= 90:
            rating = "Excellent"
        elif score >= 80:
            rating = "Good"
        elif score >= 60:
            rating = "Fair"
        elif score >= 40:
            rating = "Poor"
        else:
            rating = "Very Poor"

        end_time = datetime.utcnow()
        execution_time = (end_time - start_time).total_seconds()

        return {
            "timestamp": end_time.isoformat(),
            "execution_time": execution_time,
            "score": score,
            "rating": rating,
            "total_images": total_images,
            "missing_image_alts": len(images_missing_alt),
            "form_issue_count": form_issue_count,
            "issues": issues
        }