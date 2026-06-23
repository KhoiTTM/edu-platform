import urllib.request
import urllib.error

urls = [
    "https://ieltstrainingonline.com/wp-content/uploads/2017/06/Cambridge-12-Listening-Test-1-Section-1.mp3",
    "https://ieltstrainingonline.com/wp-content/uploads/2017/06/Cambridge-9-Listening-Test-1-Section-1.mp3"
]

for url in urls:
    req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            print(f"SUCCESS: {url} - Status: {resp.status}")
    except Exception as e:
        print(f"FAILED: {url} - {e}")
