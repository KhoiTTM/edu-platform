import sys
import asyncio
from playwright.async_api import async_playwright

async def main(url):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True, executable_path=r"C:\Program Files\Google\Chrome\Application\chrome.exe")
        page = await browser.new_page()
        print(f"Navigating to {url}...")
        await page.goto(url, wait_until="domcontentloaded")
        
        # Wait a bit for JS to render
        await page.wait_for_timeout(3000)
        
        # Get text content
        content = await page.evaluate("document.body.innerText")
        
        # Extract title (usually the 3rd line or first line that has text)
        lines = [line.strip() for line in content.split('\n') if line.strip()]
        for line in lines:
            if not line.startswith("Log in") and not line.startswith("Forgotten account?") and "Nguyễn Thắng" not in line and not line.startswith("#"):
                print(f"TITLE: {line}")
                break
                
        await browser.close()

if __name__ == "__main__":
    if len(sys.argv) > 1:
        asyncio.run(main(sys.argv[1]))
    else:
        print("Please provide a URL")
