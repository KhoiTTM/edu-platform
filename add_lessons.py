import json
import os
import re

data_str = """EN_PE_phan_biet_NEED_TO_DO_DOING.mp4	https://drive.google.com/file/d/1SLNyJefddpL7HBtVruKfM9bc4nsKgjrT/view?usp=drivesdk
EN_PE_phan_biet_DO_CAN_ARE_YOU.mp4	https://drive.google.com/file/d/1qexx-xyn6xDhLoISIBexxQ0UbMdglX30/view?usp=drivesdk
EN_PE_phan_biet_IN_ON_AT_TIME.mp4	https://drive.google.com/file/d/1mCh7AvZHzcARJ3KPx9GzBHzYcGnWExXc/view?usp=drivesdk
EN_PE_phan_biet_OF_FROM.mp4	https://drive.google.com/file/d/1QlynLeLvrBK_Y1CQiVDhdAjirxW01GQ5/view?usp=drivesdk
EN_PE_phan_biet_WHAT_HOW.mp4	https://drive.google.com/file/d/1Bm4-RsnlbX1etjkv61SsLWGNbUG4fcGJ/view?usp=drivesdk
EN_PE_phan_biet_SEE_WHAT_LOOK.mp4	https://drive.google.com/file/d/10Ac1MTr-xDW-OIF9oVBNL6IMVm2OTK_d/view?usp=drivesdk
EN_PE_phan_biet_DO_GO_PLAY.mp4	https://drive.google.com/file/d/16qQv_f5xDOn1s3gvK7DBKF7R91Br3fUN/view?usp=drivesdk
EN_PE_phan_biet_TOO_AS_WELL_ALSO_EITHER.mp4	https://drive.google.com/file/d/1uZDZOTR2u1JIwJoYIxccOMeUZncmdXLz/view?usp=drivesdk
EN_PE_phan_biet_HOPE_WISH.mp4	https://drive.google.com/file/d/1GtdDdVD68giljkhD2ZheVnv0wUZuFSEQ/view?usp=drivesdk
EN_PE_phan_biet_THE.mp4	https://drive.google.com/file/d/1jjiPgeGk-3Y37NfSWgaeI2KbEG76WgA4/view?usp=drivesdk
EN_PE_phan_biet_TO_FOR_2.mp4	https://drive.google.com/file/d/1pqbVMnkd-VkOGyYtEQEj41gEVyFoL17E/view?usp=drivesdk
EN_PE_phan_biet_QUICKLY_FAST_SOON.mp4	https://drive.google.com/file/d/1LGwsnmUJBalzo_wNLGbUFuwNfg7Qd-Dp/view?usp=drivesdk
EN_PE_phan_biet_IN_ON.mp4	https://drive.google.com/file/d/1Y-5A83U_VeCElKp4Vyoj0b5BX_VbkC_k/view?usp=drivesdk
EN_PE_phan_biet_NO_NOT.mp4	https://drive.google.com/file/d/1pkZeua1PsH_46f461B88LDDw9tkwt1H-/view?usp=drivesdk
EN_PE_phan_biet_TOO_MUCH_MUCH_TOO.mp4	https://drive.google.com/file/d/1QvZ3Po1AHnZD0XlkUtmvAkVxLOuAhwAP/view?usp=drivesdk
EN_PE_phan_biet_ACROSS_THROUGH_OVER_PAST.mp4	https://drive.google.com/file/d/1mFOOQ9TB3IihB5c8_W3kFWQ_YRtSQoqA/view?usp=drivesdk
EN_PE_phan_biet_CAN_COULD_WOULD.mp4	https://drive.google.com/file/d/1_ruJ4CN7Sk_9pB28YdsweFa2l7sxVOiG/view?usp=drivesdk
EN_PE_phan_biet_JOB_WORK.mp4	https://drive.google.com/file/d/1rCFvlmj2Tsq3X1dDXhspMmJtq_CKlBQg/view?usp=drivesdk
EN_PE_phan_biet_SPEND_COST_TAKE.mp4	https://drive.google.com/file/d/1BAEQb11pFKRJ-2Aw0q1Boc9_fGHekApl/view?usp=drivesdk
EN_PE_phan_biet_LEFT_FORGOT.mp4	https://drive.google.com/file/d/1fc2skAT_P5Sh7D8wQNmJe-j43Lnpj3GR/view?usp=drivesdk
EN_PE_phan_biet_WILL_BE_GOING_TO.mp4	https://drive.google.com/file/d/1yWs2Hr9Ya5wCEG_UiNbTxjmqotFiktJ9/view?usp=drivesdk
EN_PE_phan_biet_MUST_HAVE_TO.mp4	https://drive.google.com/file/d/1NyCx5v5LLwYSXII1Xwoq3zr8yQlgXwV6/view?usp=drivesdk
EN_PE_phan_biet_SOME_ANY.mp4	https://drive.google.com/file/d/1Y5rOvTQs2jghWwzJub82cuIjv8j3foOq/view?usp=drivesdk
EN_PE_phan_biet_TO_FOR.mp4	https://drive.google.com/file/d/1S_884tlbsojdmNdbw35DLFuY9P9JNouZ/view?usp=drivesdk
EN_PE_phan_biet_A_AN.mp4	https://drive.google.com/file/d/1XcchV4q_f_oSP2ZRy81ZK3yqw4OEE-HK/view?usp=drivesdk
EN_PE_phan_biet_FAMOUS_TO_FOR_IN_AS.mp4	https://drive.google.com/file/d/1rCLijZLDgOFatdgTr1oVfGwlkWxQVvg2/view?usp=drivesdk
EN_PE_phan_biet_WHYNOT_WHYDONT.mp4	https://drive.google.com/file/d/1KD3X0XUIZhYKLqbXpd5Js-3L7vWgA2oc/view?usp=drivesdk
EN_PE_phan_biet_STAY_LIVE.mp4	https://drive.google.com/file/d/1ssq1c2vV9l7DRwS9dbP3_OxnA4P_V8mm/view?usp=drivesdk
EN_PE_phan_biet_GET_BECOME_TURN_GO.mp4	https://drive.google.com/file/d/1ftGZILT11F75cBGsyXic8o7Q7yDCV-k7/view?usp=drivesdk
EN_PE_phan_biet_MAKE_DO.mp4	https://drive.google.com/file/d/1ViXYzOzeeUP14mu3pCDpsjY00jeucXfe/view?usp=drivesdk
EN_PE_phan_biet_LITTLE_SMALL.mp4	https://drive.google.com/file/d/1bxwz5JcOBsvNalmzAPVjReSxRqOnZBsU/view?usp=drivesdk
EN_PE_phan_biet_TALKTO_TALKWITH.mp4	https://drive.google.com/file/d/1UKOGoTIvZdwHke6HBjx1Pa1Dw5QKj_7j/view?usp=drivesdk"""

lines = data_str.strip().split('\n')

json_path = "content/practical-english-lessons.json"

with open(json_path, 'r', encoding='utf-8') as f:
    lessons = json.load(f)

# Find max ID to generate new IDs
# IDs look like "lesson-01", "lesson-45", "lesson-78", "phan-biet-01" etc.
# We'll just generate IDs like "phan-biet-01", "phan-biet-02"

pb_count = sum(1 for l in lessons if l.get('id', '').startswith('phan-biet-'))
start_id = pb_count + 1

for line in lines:
    if not line.strip(): continue
    parts = line.split('\t')
    if len(parts) < 2: continue
    filename = parts[0].strip()
    url = parts[1].strip()
    
    # Convert Google Drive link to preview
    # https://drive.google.com/file/d/1SLNyJefddpL7HBtVruKfM9bc4nsKgjrT/view?usp=drivesdk
    match = re.search(r'/d/([^/]+)', url)
    if match:
        file_id = match.group(1)
        video_url = f"https://drive.google.com/file/d/{file_id}/preview"
    else:
        video_url = url
        
    # Extract title
    # EN_PE_phan_biet_NEED_TO_DO_DOING.mp4 -> NEED TO DO DOING
    name_part = filename.replace("EN_PE_phan_biet_", "").replace(".mp4", "")
    words = name_part.split('_')
    
    # Let's make it look nice: "Phân biệt Need / To Do / Doing"
    # Actually, the user named them with _, let's replace _ with ' / ' maybe? Or just spaces?
    # e.g. NEED_TO_DO_DOING -> "NEED TO DO / DOING" - it's hard to guess perfectly.
    # Let's just use spaces for now: "NEED TO DO DOING"
    title_text = " ".join(words)
    title = f"Phân biệt: {title_text}"
    slug = f"phan-biet-{name_part.lower().replace('_', '-')}"
    
    new_lesson = {
        "id": f"phan-biet-{start_id:03d}",
        "group": "Phân Biệt Từ Vựng",
        "slug": slug,
        "title": title,
        "description": f"Video học tiếng Anh phân biệt {title_text}. Học tiếng Anh thực tế qua video ngắn.",
        "videoUrl": video_url,
        "aspectRatio": "vertical",
        "thumbnail": "/images/practical-english/phan-biet-base.jpg",
        "thumbnailText": title_text
    }
    lessons.append(new_lesson)
    start_id += 1

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(lessons, f, indent=2, ensure_ascii=False)

print(f"Added {len(lines)} new lessons to JSON.")
