import urllib.request
import urllib.error

urls = [
    "https://www.eslfast.com/robot/audio/work1.mp3",
    "https://www.eslfast.com/robot/audio/work2.mp3",
    "https://www.eslfast.com/robot/audio/work3.mp3",
    "https://sc.talkenglish.com/audio/conversation/c01.mp3",
    "https://ieltstrainingonline.com/wp-content/uploads/2021/07/Cam12-Test1-Section1.mp3"
]

for url in urls:
    req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            print(f"SUCCESS: {url} - Status: {resp.status}")
    except Exception as e:
        print(f"FAIL: {url} - {e}")
