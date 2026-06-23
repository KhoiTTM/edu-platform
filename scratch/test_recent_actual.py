import urllib.request
import urllib.error

urls = [
    "https://ieltstrainingonline.com/wp-content/uploads/2021/07/IELTS-Recent-Actual-Test-With-Answers-Practice-Test-01-Section1.mp3",
    "https://ieltstrainingonline.com/wp-content/uploads/2021/07/IELTS-Recent-Actual-Test-With-Answers-Practice-Test-05-Section1.mp3",
    "https://ieltstrainingonline.com/wp-content/uploads/2021/07/IELTS-Recent-Actual-Test-With-Answers-Practice-Test-07-Section1.mp3",
    "https://ieltstrainingonline.com/wp-content/uploads/2021/07/IELTS-Recent-Actual-Test-With-Answers-Practice-Test-09-Section1.mp3",
    "https://ieltstrainingonline.com/wp-content/uploads/2021/07/IELTS-Recent-Actual-Test-With-Answers-Practice-Test-15-Section1.mp3"
]

for url in urls:
    req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            print(f"SUCCESS: {url} - Status: {resp.status}")
    except Exception as e:
        print(f"FAIL: {url} - {e}")
