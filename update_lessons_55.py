import json
import re
import os

new_list = """EN_PE_phan_biet_NEED_TO_DO_DOING.mp4	https://drive.google.com/file/d/1SLNyJefddpL7HBtVruKfM9bc4nsKgjrT/view?usp=drivesdk
EN_PE_phan_biet_DO_CAN_ARE_YOU.mp4	https://drive.google.com/file/d/1qexx-xyn6xDhLoISIBexxQ0UbMdglX30/view?usp=drivesdk
EN_PE_phan_biet_IN_ON_AT_TIME.mp4	https://drive.google.com/file/d/1mCh7AvZHzcARJ3KPx9GzBHzYcGnWExXc/view?usp=drivesdk
EN_PE_phan_biet_OF_FROM.mp4	https://drive.google.com/file/d/1QlynLeLvrBK_Y1CQiVDhdAjirxW01GQ5/view?usp=drivesdk
EN_PE_phan_biet_WHAT_HOW.mp4	https://drive.google.com/file/d/1Bm4-RsnlbX1etjkv61SsLWGNbUG4fcGJ/view?usp=drivesdk
EN_PE_phan_biet_SEE_WHAT_LOOK.mp4	https://drive.google.com/file/d/10Ac1MTr-xDW-OIF9oVBNL6IMVm2OTK_d/view?usp=drivesdk
EN_PE_phan_biet_DO_GO_PLAY.mp4	https://drive.google.com/file/d/16qQv_f5xDOn1s3gvK7DBKF7R91Br3fUN/view?usp=drivesdk
EN_PE_phan_biet_TOO_AS_WELL_ALSO_EITHER.mp4	https://drive.google.com/file/d/1uZDZOTR2u1JIwJoYIxccOMeUZncmdXLz/view?usp=drivesdk
EN_PE_phan_biet_HOPE_WISH.mp4	https://drive.google.com/file/d/1GtdDdVD68giljkhD2ZheVnv0wUZuFSEQ/view?usp=drivesdk
EN_PE_phan_biet_MAKE_DO.mp4	https://drive.google.com/file/d/1ViXYzOzeeUP14mu3pCDpsjY00jeucXfe/view?usp=drivesdk
EN_PE_phan_biet_LITTLE_SMALL.mp4	https://drive.google.com/file/d/1bxwz5JcOBsvNalmzAPVjReSxRqOnZBsU/view?usp=drivesdk
EN_PE_phan_biet_TALKTO_TALKWITH.mp4	https://drive.google.com/file/d/1UKOGoTIvZdwHke6HBjx1Pa1Dw5QKj_7j/view?usp=drivesdk
EN_PE_phan_biet_METOO_MEEITHER.mp4	https://drive.google.com/file/d/12qh4E7DDhQQT49v8v9rX0sfNL_iLnMvL/view?usp=drivesdk
EN_PE_phan_biet_TODO_DOING.mp4	https://drive.google.com/file/d/1i8KYjIg0J4kSEFSq5F85v-f7gIyiMEgS/view?usp=drivesdk
EN_PE_phan_biet_IN_ON_AT.mp4	https://drive.google.com/file/d/1VrjuWFBB1IbC2mmuRGJ6T7FKtuYrd8th/view?usp=drivesdk
EN_PE_phan_biet_BESIDE_NEAR_NEXTO.mp4	https://drive.google.com/file/d/11LwirHiNiu4TLR4VvDEz1Nm9DwZvFwWm/view?usp=drivesdk
EN_PE_phan_biet_NATION_STATE_COUNTRY.mp4	https://drive.google.com/file/d/1uRQciq9xaf3NxnZtE0b4UwmWADL5x5mj/view?usp=drivesdk
EN_PE_phan_biet_OCLOCK.mp4	https://drive.google.com/file/d/15F1yXNYaXCOtdBIgHY1BYai64UZhG5DG/view?usp=drivesdk
EN_PE_phan_biet_BEGIN_START.mp4	https://drive.google.com/file/d/1v7fINuGClm9qxFkUK60pA9BpvKhGefcS/view?usp=drivesdk
EN_PE_phan_biet_ADVISE_SUGGEST.mp4	https://drive.google.com/file/d/1b2dsPXbHvDP-a7si-LBzN_LpFlQynq9Z/view?usp=drivesdk
EN_PE_phan_biet_AGREETO_AGREEWITH.mp4	https://drive.google.com/file/d/12iTeFZcCuXYyG84qGGjNpu3dnPZu0Ci6/view?usp=drivesdk
EN_PE_phan_biet_BELIKE_LOOKLIKE.mp4	https://drive.google.com/file/d/1rYSwntUPK36fzd2GERMW1OrcB5NX9O2j/view?usp=drivesdk
EN_PE_phan_biet_FAMOUS_INFAMOUS.mp4	https://drive.google.com/file/d/1s6PHt5Dtx6Am_hXgDuj_APxHycs_bR4S/view?usp=drivesdk
EN_PE_phan_biet_OTHER_ANOTHER.mp4	https://drive.google.com/file/d/1sUKql5PnF7d8y_zJzQRRNX8A3ZUer5nW/view?usp=drivesdk
EN_PE_phan_biet_The_SHIT.mp4	https://drive.google.com/file/d/1RO5azhdFSDAgw-V1pXV8Zua_xND9a2h5/view?usp=drivesdk
EN_PE_phan_biet_BORED_BORING.mp4	https://drive.google.com/file/d/16nm76PVQS48JhhGQcU-cfYerGOIisqEt/view?usp=drivesdk
EN_PE_phan_biet_IS_ARE.mp4	https://drive.google.com/file/d/1_aKaf1NW0y2GNyL2YPR1ebG-dlbHCnKj/view?usp=drivesdk
EN_PE_phan_biet_BESIDE_BESIDES.mp4	https://drive.google.com/file/d/1I0pY7-puwap3PzEZaXnNZVi-59IfQInt/view?usp=drivesdk
EN_PE_menh_de_quan_he_P5.mp4	https://drive.google.com/file/d/1uEx7pbg_PIwR0-KUSbHqoCwq30F0z6EA/view?usp=drivesdk
EN_PE_cau_dieu_kien_P2.mp4	https://drive.google.com/file/d/1J8uiiFnpKF-RxJQ7YhwR7SyAIDQY0Cv_/view?usp=drivesdk
EN_PE_menh_de_quan_he_P4.mp4	https://drive.google.com/file/d/1vsTHXMU0F_DbO6si3rbTXWlovyE3if_y/view?usp=drivesdk
EN_PE_cau_dieu_kien_P1.mp4	https://drive.google.com/file/d/1-naV91OpNysJB-kUfdwz3lawdgOrinvk/view?usp=drivesdk
EN_PE_menh_de_quan_he_P3.mp4	https://drive.google.com/file/d/16mWsrWoSGwPZCj5kRsob8kf5sqw79-pc/view?usp=drivesdk
EN_PE_menh_de_quan_he_P2.mp4	https://drive.google.com/file/d/1PVJDTCPckYBZBFydswmu7y-rLYBeE0Lz/view?usp=drivesdk
EN_PE_menh_de_quan_he_P1.mp4	https://drive.google.com/file/d/1li16OGisLMFRQ_rn2GdBlBisf9g-sEKy/view?usp=drivesdk
EN_PE_origin_and_history_ABOUT.mp4	https://drive.google.com/file/d/1i7nsped6_ZVdkRT0iXuOFczXnxhuenTa/view?usp=drivesdk
EN_PE_origin_and_history_ON.mp4	https://drive.google.com/file/d/1NHppDxLQYmi4pMJr_g_t-MQ_SsNhSaIl/view?usp=drivesdk
EN_PN_orgin_and_history_AT.mp4	https://drive.google.com/file/d/1YPEXJu7m3oaF-EhNB-bUOVCzcgcHQfhx/view?usp=drivesdk
EN_PE_origin_and_history_TO.mp4	https://drive.google.com/file/d/10JG1A38QIaWiEqSW1d0-WjXRaHr1uhrU/view?usp=drivesdk
EN_PE_core_grammar_CAUCOBAN.mp4	https://drive.google.com/file/d/1adspLGj2mJdKGSs0sYA1-K3t7CJQDdtt/view?usp=drivesdk
EN_PE_core_grammar_TRATTUTINHTU.mp4	https://drive.google.com/file/d/1XpGNvpsjUpvrarYcSFmTbpuRX4alqoRf/view?usp=drivesdk
EN_PE_core_grammar_CAUTRUCCAU.mp4	https://drive.google.com/file/d/1_grFBd84gHePAnFXF0qD769hX18RUUBM/view?usp=drivesdk
EN_PE_core_grammar_XULYCAU.mp4	https://drive.google.com/file/d/1d6Y9rCKcdka3djB097uQJixKg8m2pd7g/view?usp=drivesdk
EN_PE_core_grammar_4DANG_DO.mp4	https://drive.google.com/file/d/13Po7sZsxCOPV0EFICrv7wyilszs6kvCa/view?usp=drivesdk
EN_PE_core_grammar_MAOTU.mp4	https://drive.google.com/file/d/1NlEDDferfQN8lqYB8uMkHQ-9gf6JKGwW/view?usp=drivesdk
EN_PE_core_grammar_ED_ING.mp4	https://drive.google.com/file/d/1qRiOHw-ibn1oZN3EKIgPNCiKRG8pyRNR/view?usp=drivesdk
EN_PE_core_grammar_KHUNGTIENGANH.mp4	https://drive.google.com/file/d/1t59IItvMAmp9di1TwsysroGot92FQgO8/view?usp=drivesdk
EN_PE_core_grammar_THEREBE.mp4	https://drive.google.com/file/d/1tYY_IH32JQOAtsEV_hOxMBBjE4cvRCRf/view?usp=drivesdk
EN_PE_core_grammar_10_tu_loai.mp4	https://drive.google.com/file/d/1qcPjHznQ8ywKqGIjwfkz5zugRKyPFny_/view?usp=drivesdk
EN_PE_core_grammar_16_thi_tenses.mp4	https://drive.google.com/file/d/1W6tz10Ejd4IjN9_Ml9q5vTKyt7xn1gDM/view?usp=drivesdk
EN_PE_origin_and_history_FOR.mp4	https://drive.google.com/file/d/1Ue6OcJOKCdMMmIOSHVNiEenrW5ayPAGp/view?usp=drivesdk
EN_PE_origin_and_history_WITH.mp4	https://drive.google.com/file/d/1E_LjgLdEu5c5DENe51QyJEHFu7N5eAFl/view?usp=drivesdk
EN_PE_origin_and_history_BY.mp4	https://drive.google.com/file/d/1XjRWKYm1OIogVgK4nhok9rW91YfXasA8/view?usp=drivesdk
EN_PE_origin_and_history_AS.mp4	https://drive.google.com/file/d/1EP8okY2JZlFMlIxl94WsOSa_PZYYJggy/view?usp=drivesdk
EN_PE_origin_an_history_OFF.mp4	https://drive.google.com/file/d/17xs8gKUlGyovePxrpJL_RoWeNcUFffvx/view?usp=drivesdk"""

json_path = "content/practical-english-lessons.json"

with open(json_path, 'r', encoding='utf-8') as f:
    lessons = json.load(f)

# Helper function to get Drive Preview URL
def get_preview_url(url):
    match = re.search(r'/d/([^/]+)', url)
    if match:
        return f"https://drive.google.com/file/d/{match.group(1)}/preview"
    return url

# Re-build the entire list based on the new_list
# We will create a fresh list to maintain order and clean up old data,
# but we will try to preserve descriptions from existing lessons if possible.
new_lessons = []
next_id = 1

for line in new_list.strip().split('\n'):
    if not line.strip(): continue
    parts = line.split('\t')
    if len(parts) < 2: continue
    filename = parts[0].strip()
    url = parts[1].strip()
    
    video_url = get_preview_url(url)
    
    # Determine Group, Slug, Title, Thumbnail
    group = "Khác"
    thumbnail = "/images/practical-english/default.png"
    slug = ""
    title = ""
    thumbnail_text = ""
    
    if "phan_biet" in filename.lower():
        group = "Master Confusing Words"
        thumbnail = "/images/practical-english/phan_biet.png"
        name_part = filename.lower().split("phan_biet_")[-1].replace(".mp4", "")
        slug = f"phan-biet-{name_part.replace('_', '-')}"
        title = f"Phân biệt: {name_part.upper().replace('_', ' ')}"
        thumbnail_text = name_part.upper().replace('_', ' ')
        
    elif "cau_dieu_kien" in filename.lower():
        group = "Câu Điều Kiện"
        thumbnail = "/images/practical-english/cau-dieu-kien.jpg"
        name_part = filename.lower().split("cau_dieu_kien_")[-1].replace(".mp4", "")
        slug = f"cau-dieu-kien-{name_part.replace('_', '-')}"
        title = f"Câu Điều Kiện - {name_part.upper().replace('_', ' ')}"
        thumbnail_text = name_part.upper().replace('_', ' ')
        
    elif "menh_de_quan_he" in filename.lower():
        group = "Mệnh Đề Quan Hệ"
        thumbnail = "/images/practical-english/menh-de-quan-he.jpg"
        name_part = filename.lower().split("menh_de_quan_he_")[-1].replace(".mp4", "")
        slug = f"menh-de-quan-he-{name_part.replace('_', '-')}"
        title = f"Mệnh Đề Quan Hệ - {name_part.upper().replace('_', ' ')}"
        thumbnail_text = name_part.upper().replace('_', ' ')
        
    elif "core_grammar" in filename.lower():
        group = "Core Grammar"
        thumbnail = "/images/practical-english/core-grammar.jpg"
        name_part = filename.lower().split("core_grammar_")[-1].replace(".mp4", "")
        slug = f"core-grammar-{name_part.replace('_', '-')}"
        title = f"Core Grammar: {name_part.upper().replace('_', ' ')}"
        thumbnail_text = name_part.upper().replace('_', ' ')
        
    elif "origin_and_history" in filename.lower() or "orgin_and_history" in filename.lower() or "origin_an_history" in filename.lower():
        group = "Origin and History"
        thumbnail = "/images/practical-english/origin-history-base.jpg"
        # Extract the last word as the preposition
        word = filename.replace(".mp4", "").split("_")[-1].upper()
        slug = f"origin-history-of-{word.lower()}"
        title = f"History and Original of {word}"
        thumbnail_text = word
    
    # Check if we have an existing lesson to preserve description
    existing_lesson = None
    # Try match by title or slug
    for el in lessons:
        if el.get("slug") == slug or el.get("title") == title:
            existing_lesson = el
            break
            
    # If no existing lesson, try to find a similar one (e.g. Me too me either was bai-43)
    if not existing_lesson and "phan_biet" in filename.lower():
        if "METOO_MEEITHER" in filename:
            for el in lessons:
                if "me-too-me-either" in el.get("slug", ""):
                    existing_lesson = el
                    break
                    
    description = existing_lesson.get("description", f"Video học tiếng Anh: {title}. Học tiếng Anh thực tế qua video ngắn.") if existing_lesson else f"Video học tiếng Anh: {title}. Học tiếng Anh thực tế qua video ngắn."
    
    # Some older files have weird characters in description due to mojibake from before, let's fix if we can
    if "H?c" in description or "Ngu\"n" in description:
        description = f"Video học tiếng Anh: {title}. Học tiếng Anh thực tế qua video ngắn."
        
    # We will use id format lesson-xxx
    new_lesson = {
        "id": f"lesson-{next_id:03d}",
        "group": group,
        "slug": slug,
        "title": title,
        "description": description,
        "videoUrl": video_url,
        "aspectRatio": "vertical",
        "thumbnail": thumbnail,
        "thumbnailText": thumbnail_text
    }
    new_lessons.append(new_lesson)
    next_id += 1

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(new_lessons, f, indent=2, ensure_ascii=False)

print(f"Successfully generated JSON with {len(new_lessons)} lessons.")
