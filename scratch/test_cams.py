import urllib.request
import urllib.error

urls = [
    "https://ieltstrainingonline.com/wp-content/uploads/2021/07/Cam13-Test1-Section1.mp3",
    "https://ieltstrainingonline.com/wp-content/uploads/2021/07/Cam14-Test1-Section1.mp3",
    "https://ieltstrainingonline.com/wp-content/uploads/2021/07/Cam15-Test1-Section1.mp3",
    "https://ieltstrainingonline.com/wp-content/uploads/2021/07/Cam16-Test1-Section1.mp3",
    "https://ieltstrainingonline.com/wp-content/uploads/2021/07/Cam17-Test1-Section1.mp3"
]

for url in urls:
    req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            print(f"SUCCESS: {url} - Status: {resp.status}")
    except Exception as e:
        print(f"FAIL: {url} - {e}")
