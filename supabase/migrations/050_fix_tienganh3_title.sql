-- Migration 050: Tên cố định cho bộ đề SBT Tiếng Anh 3 - Tập 1
--
-- VẤN ĐỀ: như migration 049, trigger generate_assessment_title() ghi đè cột title.
-- Với collection Tiếng Anh 3 (units=[1..5]) nó ghép thành "Tiếng Anh 3 - ... - Đề N",
-- nên không giữ được tên "SBT Tiếng Anh 3 - Tập 1" đặt thủ công.
--
-- GIẢI PHÁP: thêm ngoại lệ — subject 'tieng_anh' + grade 3 -> tên cố định.
-- An toàn: Toán dùng subject khác; Tiếng Anh 3 hiện chỉ có bộ đề ôn tập theo SBT này.
-- Nếu sau này Tiếng Anh 3 có thêm nhóm đề KHÁC cần tên riêng, mở rộng điều kiện
-- (thêm tham số exam_type vào hàm + trigger) — hiện chưa cần.

CREATE OR REPLACE FUNCTION public.generate_assessment_title(
    p_subject text, p_grade integer, p_volume integer, p_units integer[], p_seq integer
) RETURNS text
 LANGUAGE plpgsql
 IMMUTABLE
AS $function$
DECLARE
    v_sub_name TEXT;
    v_vol_str TEXT := '';
    v_unit_str TEXT := '';
    v_is_vietnamese BOOLEAN := true;
BEGIN
    -- NGOẠI LỆ 1: nhóm đề giữa kỳ Toán (mã unit 101) -> tên cố định.
    IF p_units IS NOT NULL AND 101 = ANY(p_units) THEN
        RETURN 'Kiểm Tra Giữa Kỳ 1';
    END IF;

    -- NGOẠI LỆ 2: bộ đề SBT Tiếng Anh 3 - Tập 1 -> tên cố định.
    IF (p_subject = 'tieng_anh' OR p_subject = 'english') AND p_grade = 3 THEN
        RETURN 'SBT Tiếng Anh 3 - Tập 1';
    END IF;

    -- Xác định tên môn học
    IF p_subject = 'math' OR p_subject = 'toan' THEN
        v_sub_name := 'Toán';
        v_is_vietnamese := true;
    ELSIF p_subject = 'ielts' THEN
        v_sub_name := 'IELTS';
        v_is_vietnamese := false;
    ELSIF p_subject = 'tieng_anh' OR p_subject = 'english' THEN
        v_sub_name := 'Tiếng Anh';
        v_is_vietnamese := true;
    ELSE
        v_sub_name := 'English';
        v_is_vietnamese := false;
    END IF;

    IF p_volume IS NOT NULL AND p_volume > 0 THEN
        IF v_is_vietnamese THEN v_vol_str := ' - Tập ' || p_volume;
        ELSE v_vol_str := ' - Vol ' || p_volume; END IF;
    END IF;

    IF p_units IS NOT NULL AND array_length(p_units, 1) > 0 THEN
        IF array_length(p_units, 1) = 2 AND p_subject IN ('toan', 'math') THEN
            v_unit_str := ' - Chương ' || p_units[1] || ' - Bài ' || p_units[2];
        ELSIF array_length(p_units, 1) > 1 THEN
            IF v_is_vietnamese THEN v_unit_str := ' - Bài ' || array_to_string(p_units, ', ');
            ELSE v_unit_str := ' - Units ' || array_to_string(p_units, ', '); END IF;
        ELSE
            IF v_is_vietnamese THEN v_unit_str := ' - Bài ' || p_units[1];
            ELSE v_unit_str := ' - Unit ' || p_units[1]; END IF;
        END IF;
    END IF;

    IF p_grade IS NULL OR p_grade = 0 THEN
        IF v_is_vietnamese THEN RETURN v_sub_name || v_vol_str || v_unit_str || ' - Đề ' || COALESCE(p_seq, 1);
        ELSE RETURN v_sub_name || v_vol_str || v_unit_str || ' - Ex ' || COALESCE(p_seq, 1); END IF;
    ELSE
        IF v_is_vietnamese THEN RETURN v_sub_name || ' ' || p_grade || v_vol_str || v_unit_str || ' - Đề ' || COALESCE(p_seq, 1);
        ELSE RETURN v_sub_name || ' Grade ' || p_grade || v_vol_str || v_unit_str || ' - Ex ' || COALESCE(p_seq, 1); END IF;
    END IF;
END;
$function$;

-- Áp tên mới ngay cho collection Tiếng Anh 3 hiện có
UPDATE public.assessment_collections
SET title = public.generate_assessment_title(subject_slug, grade, volume, units, sequence_number)
WHERE subject_slug IN ('tieng_anh','english') AND grade = 3;
