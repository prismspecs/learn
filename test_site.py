import unittest
import os
import re
from html.parser import HTMLParser

class SimpleHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.attrs = {}
        self.text_content = []
        self.current_tag = None

    def handle_starttag(self, tag, attrs):
        self.tags.append(tag)
        self.current_tag = tag
        attr_dict = dict(attrs)
        if tag not in self.attrs:
            self.attrs[tag] = []
        self.attrs[tag].append(attr_dict)

    def handle_data(self, data):
        clean_data = data.strip()
        if clean_data:
            self.text_content.append((self.current_tag, clean_data))

    def handle_endtag(self, tag):
        self.current_tag = None

class TestCoursePortal(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html_path = "index.html"
        cls.css_path = "style.css"
        cls.js_path = "app.js"

    def test_files_exist(self):
        """Verify that index.html, style.css, and app.js exist."""
        self.assertTrue(os.path.exists(self.html_path), "index.html is missing")
        self.assertTrue(os.path.exists(self.css_path), "style.css is missing")
        self.assertTrue(os.path.exists(self.js_path), "app.js is missing")

    def test_html_structure(self):
        """Verify semantic structure and critical elements in index.html."""
        if not os.path.exists(self.html_path):
            self.skipTest("index.html not found")

        with open(self.html_path, "r", encoding="utf-8") as f:
            html_content = f.read()

        parser = SimpleHTMLParser()
        parser.feed(html_content)

        # Check critical semantic tags
        self.assertIn("html", parser.tags, "Missing <html> tag")
        self.assertIn("head", parser.tags, "Missing <head> tag")
        self.assertIn("body", parser.tags, "Missing <body> tag")
        self.assertIn("header", parser.tags, "Missing <header> tag")
        self.assertIn("main", parser.tags, "Missing <main> tag")
        self.assertIn("footer", parser.tags, "Missing <footer> tag")

        # Check for stylesheet link
        link_attrs = parser.attrs.get("link", [])
        has_css = any(attr.get("href") == "style.css" and attr.get("rel") == "stylesheet" for attr in link_attrs)
        self.assertTrue(has_css, "index.html does not link to style.css correctly")

        # Check for javascript script tag
        script_attrs = parser.attrs.get("script", [])
        has_js = any(attr.get("src") == "app.js" for attr in script_attrs)
        self.assertTrue(has_js, "index.html does not reference app.js")

    def test_seo_metadata(self):
        """Verify SEO best practices: title, viewport, meta description."""
        if not os.path.exists(self.html_path):
            self.skipTest("index.html not found")

        with open(self.html_path, "r", encoding="utf-8") as f:
            html_content = f.read()

        parser = SimpleHTMLParser()
        parser.feed(html_content)

        # Title checking
        self.assertIn("title", parser.tags, "Missing <title> tag")
        
        # Meta checking
        meta_attrs = parser.attrs.get("meta", [])
        has_viewport = any(attr.get("name") == "viewport" for attr in meta_attrs)
        self.assertTrue(has_viewport, "Missing viewport meta tag for mobile responsiveness")

        has_description = any(attr.get("name") == "description" for attr in meta_attrs)
        self.assertTrue(has_description, "Missing meta description for SEO")

    def test_courses_present(self):
        """Verify that all four courses are defined in the HTML."""
        if not os.path.exists(self.html_path):
            self.skipTest("index.html not found")

        with open(self.html_path, "r", encoding="utf-8") as f:
            html_content = f.read()

        parser = SimpleHTMLParser()
        parser.feed(html_content)

        # Check course detail article sections exist
        articles = parser.attrs.get("article", [])
        article_ids = [art.get("id") for art in articles if "id" in art]

        required_courses = [
            "hacking-als-praxis",
            "creative-coding-mischief",
            "unity-trust",
            "unity-solitude"
        ]

        for course in required_courses:
            self.assertIn(course, article_ids, f"Course detail section for '{course}' is missing")

    def test_bio_present(self):
        """Verify that Grayson Earle's biography is present in the page."""
        if not os.path.exists(self.html_path):
            self.skipTest("index.html not found")

        with open(self.html_path, "r", encoding="utf-8") as f:
            html_content = f.read()

        self.assertIn("Grayson Earle", html_content, "Bio does not mention 'Grayson Earle'")
        self.assertIn("Bail Bloc", html_content, "Bio does not mention 'Bail Bloc'")
        self.assertIn("The Illuminator", html_content, "Bio does not mention 'The Illuminator'")

if __name__ == "__main__":
    unittest.main()
