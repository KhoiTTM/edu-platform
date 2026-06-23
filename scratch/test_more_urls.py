import urllib.request
import urllib.error

patterns = [
    # Cambridge 9 Test 1 Section 1
    "https://ieltstrainingonline.com/wp-content/uploads/2021/07/Cam9-Test1-Section1.mp3",
    "https://ieltstrainingonline.com/wp-content/uploads/2021/07/Cam9-Test-1-Section-1.mp3",
    "https://ieltstrainingonline.com/wp-content/uploads/2021/07/Cam9-Test1.mp3",
    "https://ieltstrainingonline.com/wp-content/uploads/2021/07/Cam9-T1S1.mp3",
    "https://ieltstrainingonline.com/wp-content/uploads/2021/07/Cambridge-9-Test-1-Section-1.mp3",
    "https://ieltstrainingonline.com/wp-content/uploads/2021/07/Cambridge-9-Listening-Test-1-Section-1.mp3",
    "https://ieltstrainingonline.com/wp-content/uploads/2016/09/Cambridge-IELTS-9-Listening-Test-1-Section-1.mp3",
    "https://ieltstrainingonline.com/wp-content/uploads/2016/09/Cam9-Test-1-Section-1.mp3",
    "https://ieltstrainingonline.com/wp-content/uploads/2016/09/Cam9-Test1-Section1.mp3",

    # IELTS Practice Test Plus 1 Test 2 Section 1
    "https://ieltstrainingonline.com/wp-content/uploads/2021/07/IELTS-Practice-Tests-Plus-1-Test-2-Section-1.mp3",
    "https://ieltstrainingonline.com/wp-content/uploads/2021/07/Practice-Test-Plus-1-Test-2-Section-1.mp3",
    "https://ieltstrainingonline.com/wp-content/uploads/2021/07/Plus1-Test2-Section1.mp3",
    "https://ieltstrainingonline.com/wp-content/uploads/2021/07/Plus-1-Test-2-Section-1.mp3"
]

for url in patterns:
    req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=4) as resp:
            print(f"SUCCESS: {url} - Status: {resp.status}")
    except Exception as e:
        # pass
        print(f"FAIL: {url} - {e}")
