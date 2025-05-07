import os
import json
import google.generativeai as genai
import base64
import datetime

class LLMService:
    """
    Integrates with Google Gemini (via Generative AI SDK) to produce
    a comprehensive report and actionable feedback.
    """

    def __init__(self):
        # Configure the client with your Gemini API key
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        self.model = genai.GenerativeModel('gemini-2.0-flash')

    def analyze(
        self,
        html_content,
        screenshot,
        url,
        seo_analysis,
        mobile_analysis,
        performance_analysis,
        accessibility_analysis
    ):
        if isinstance(screenshot, bytes):
            screenshot_b64 = base64.b64encode(screenshot).decode("utf-8")
        else:
            # Assuming screenshot is already a base64 encoded string if not bytes
            screenshot_b64 = screenshot
        
        image_bytes = base64.b64decode(screenshot_b64)
        image_part = {
            "mime_type": "image/png",
            "data": image_bytes
        }

        # Build a structured prompt for Gemini
        prompt = f"""
        You are a web optimization assistant. Given the following:
        - URL: {url}
        - SEO findings: {json.dumps(seo_analysis)}
        - Mobile findings: {json.dumps(mobile_analysis)}
        - Performance findings: {json.dumps(performance_analysis)}
        - Accessibility findings: {json.dumps(accessibility_analysis)}
        - Raw HTML: {html_content}
        
        Provide:
        1. A concise summary of the overall site health.
        2. Top 5 prioritized recommendations to improve SEO, performance, mobile UX, and accessibility.
        3. Any code snippets or configuration samples if relevant.
        Format your response as JSON with keys: "summary", "recommendations", and "snippets".
        """

        generation_config = genai.types.GenerationConfig(
            temperature=0.2,
            candidate_count=1,
            stop_sequences=["\n\n"] # Note: This might prematurely cut off JSON with newlines.
                                     # Consider removing or adjusting if JSON output is truncated.
        )

        # Call Gemini using the new API structure
        # The content should be a list: [prompt_text, image_data]
        response = self.model.generate_content(
            [prompt, image_part],
            generation_config=generation_config
        )

        # Access the response text
        # For non-streaming, response.text should contain the generated content.
        # If issues arise, or for more complex scenarios (e.g. multi-part response),
        # you might need to inspect response.candidates[0].content.parts.
        content = response.text
        print(f"LLM Response: {content}")
        try:
            report = json.loads(content)
        except json.JSONDecodeError:
            # Fallback if response isn’t valid JSON
            report = {
                "summary": f"Failed to parse LLM response as JSON. Raw response: {content}",
                "recommendations": [],
                "snippets": {}
            }

        # Attach a timestamp and raw message
        report.update({
            "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "raw": content
        })
        return report