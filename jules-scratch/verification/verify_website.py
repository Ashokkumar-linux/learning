import os
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Get the absolute path to the repository root
    repo_root = os.path.abspath('.')

    # Home page
    page.goto(f"file://{repo_root}/index.html")
    page.screenshot(path="jules-scratch/verification/home.png")

    # Services page
    page.goto(f"file://{repo_root}/pages/services.html")
    page.screenshot(path="jules-scratch/verification/services.png")

    # Projects page
    page.goto(f"file://{repo_root}/pages/projects.html")
    page.screenshot(path="jules-scratch/verification/projects-all.png")

    # About Us page
    page.goto(f"file://{repo_root}/pages/about.html")
    page.screenshot(path="jules-scratch/verification/about.png")

    # Contact page
    page.goto(f"file://{repo_root}/pages/contact.html")
    page.screenshot(path="jules-scratch/verification/contact.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
