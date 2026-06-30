-- Migration 049: Tên cố định cho nhóm đề giữa kỳ (units = [101])
--
-- VẤN ĐỀ: trigger trigger_reorder_assessment_collections gọi generate_assessment_title()
-- mỗi khi bảng assessment_collections thay đổi, và GHI ĐÈ cột title theo công thức ghép
-- từ units. Với đề giữa kỳ (units = [101]) nó luôn ra "Toán 3 - Tập 1 - Bài 101 - Đề N",
-- nên mọi lần UPDATE title thủ công đều bị kéo về tên này.
--
-- GIẢI PHÁP: thêm ngoại lệ ngay đầu hàm — units chứa 101 (mã quy ước cho đề giữa kỳ)
-- thì trả về tên cố định, KHÔNG ghép theo công thức. Bền vững: trigger chạy lại vẫn ra tên này.
-- Các nhóm khác (units 1..N của đề luyện theo bài) giữ nguyên hành vi cũ.

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
    -- NGOẠI LỆ: nhóm đề giữa kỳ (mã unit 101) -> tên cố định, không ghép theo công thức.
    IF p_units IS NOT NULL AND 101 = ANY(p_units) THEN
        RETURN 'Kiểm Tra Giữa Kỳ 1';
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

    -- Xử lý phần Tập / Volume
    IF p_volume IS NOT NULL AND p_volume > 0 THEN
        IF v_is_vietnamese THEN
            v_vol_str := ' - Tập ' || p_volume;
        ELSE
            v_vol_str := ' - Vol ' || p_volume;
        END IF;
    END IF;

    -- Xử lý phần Chương / Bài / Unit
    IF p_units IS NOT NULL AND array_length(p_units, 1) > 0 THEN
        IF array_length(p_units, 1) = 2 AND p_subject IN ('toan', 'math') THEN
            v_unit_str := ' - Chương ' || p_units[1] || ' - Bài ' || p_units[2];
        ELSIF array_length(p_units, 1) > 1 THEN
            IF v_is_vietnamese THEN
                v_unit_str := ' - Bài ' || array_to_string(p_units, ', ');
            ELSE
                v_unit_str := ' - Units ' || array_to_string(p_units, ', ');
            END IF;
        ELSE
            IF v_is_vietnamese THEN
                v_unit_str := ' - Bài ' || p_units[1];
            ELSE
                v_unit_str := ' - Unit ' || p_units[1];
            END IF;
        END IF;
    END IF;

    -- Ghép chuỗi hoàn chỉnh
    IF p_grade IS NULL OR p_grade = 0 THEN
        IF v_is_vietnamese THEN
            RETURN v_sub_name || v_vol_str || v_unit_str || ' - Đề ' || COALESCE(p_seq, 1);
        ELSE
            RETURN v_sub_name || v_vol_str || v_unit_str || ' - Ex ' || COALESCE(p_seq, 1);
        END IF;
    ELSE
        IF v_is_vietnamese THEN
            RETURN v_sub_name || ' ' || p_grade || v_vol_str || v_unit_str || ' - Đề ' || COALESCE(p_seq, 1);
        ELSE
            RETURN v_sub_name || ' Grade ' || p_grade || v_vol_str || v_unit_str || ' - Ex ' || COALESCE(p_seq, 1);
        END IF;
    END IF;
END;
$function$;

-- Áp tên mới ngay cho mọi collection giữa kỳ hiện có (trigger sẽ tự dùng hàm mới khi UPDATE)
UPDATE public.assessment_collections
SET title = public.generate_assessment_title(subject_slug, grade, volume, units, sequence_number)
WHERE units @> ARRAY[101];
