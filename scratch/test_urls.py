import urllib.request
import urllib.error

urls = [
    # Family Excursions (Cam 12 Test 1 Sec 1)
    "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/CAM12_T1S1.mp3",
    "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/CAM12_T1S1.m4a",
    "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/CAM12_L1_S1.mp3",
    "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/CAM12_L1_S1.m4a",
    "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/CAM12_L1S1.mp3",
    "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/CAM12_L1S1.m4a",
    "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/CAM12_T1_S1.mp3",
    "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/CAM12_T1_S1.m4a",
    
    # Job Inquiry (Cam 9 Test 1 Sec 1)
    "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/CAM9_T1S1.mp3",
    "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/CAM9_T1S1.m4a",
    "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/CAM9_L1_S1.mp3",
    "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/CAM9_L1_S1.m4a",
    "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/CAM9_L1S1.mp3",
    "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/CAM9_L1S1.m4a",
    
    # University Language Centre
    "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/PL1_T2S1.mp3",
    "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/PL1_T2S1.m4a",
    "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/PLUS1_T2S1.mp3",
    "https://suijm9clouobj.vcdn.cloud/PUBLIC/MEDIA/PLUS1_T2S1.m4a"
]

for url in urls:
    req = urllib.request.Request(url, method="HEAD")
    try:
        with urllib.request.urlopen(req, timeout=3) as resp:
            print(f"SUCCESS: {url} - Status: {resp.status}")
    except urllib.error.HTTPError as e:
        # We only care about 200/SUCCESS
        pass
    except Exception as e:
        print(f"ERROR: {url} - {e}")
