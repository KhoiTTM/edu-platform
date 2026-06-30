-- Migration 051: Đặt tên collection theo exam_type (sửa tác dụng phụ của 049/050)
--
-- VẤN ĐỀ: 050 đặt tên cố định "SBT Tiếng Anh 3 - Tập 1" cho MỌI collection
-- tieng_anh grade 3 — gồm cả 120 đề LUYỆN-THEO-BÀI (exam_type IS NULL), làm mất tên đúng.
-- Hàm generate_assessment_title cũ không nhận exam_type nên không phân biệt được.
--
-- GIẢI PHÁP: thêm tham số p_exam_type. Chỉ exam_type='midterm' mới trả tên cố định:
--   - Toán giữa kỳ (units chứa 101) -> "Kiểm Tra Giữa Kỳ 1"
--   - Tiếng Anh 3 midterm           -> "SBT Tiếng Anh 3 - Tập 1"
-- exam_type khác/NULL (đề luyện theo bài) -> ghép tên theo công thức như cũ.
-- Trigger được sửa để truyền exam_type vào hàm.

-- 1) Hàm mới: thêm p_exam_type
CREATE OR REPLACE FUNCTION public.generate_assessment_title(
    p_subject text, p_grade integer, p_volume integer, p_units integer[], p_seq integer,
    p_exam_type text DEFAULT NULL
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
    -- Tên cố định CHỈ cho đề thi (midterm), không áp cho đề luyện theo bài.
    IF p_exam_type = 'midterm' THEN
        IF p_units IS NOT NULL AND 101 = ANY(p_units) THEN
            RETURN 'Kiểm Tra Giữa Kỳ 1';
        END IF;
        IF (p_subject = 'tieng_anh' OR p_subject = 'english') AND p_grade = 3 THEN
            RETURN 'SBT Tiếng Anh 3 - Tập 1';
        END IF;
    END IF;

    IF p_subject = 'math' OR p_subject = 'toan' THEN
        v_sub_name := 'Toán'; v_is_vietnamese := true;
    ELSIF p_subject = 'ielts' THEN
        v_sub_name := 'IELTS'; v_is_vietnamese := false;
    ELSIF p_subject = 'tieng_anh' OR p_subject = 'english' THEN
        v_sub_name := 'Tiếng Anh'; v_is_vietnamese := true;
    ELSE
        v_sub_name := 'English'; v_is_vietnamese := false;
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

-- 2) Trigger: truyền exam_type vào hàm
CREATE OR REPLACE FUNCTION public.reorder_assessment_sequences_trigger()
RETURNS TRIGGER AS $$
DECLARE
    v_subject TEXT; v_grade INTEGER; v_volume INTEGER; v_units INTEGER[]; v_exam_type TEXT;
BEGIN
    IF pg_trigger_depth() > 1 THEN RETURN NULL; END IF;

    IF TG_OP = 'DELETE' THEN
        v_subject := OLD.subject_slug; v_grade := OLD.grade; v_volume := OLD.volume; v_units := OLD.units; v_exam_type := OLD.exam_type;
    ELSE
        v_subject := NEW.subject_slug; v_grade := NEW.grade; v_volume := NEW.volume; v_units := NEW.units; v_exam_type := NEW.exam_type;
    END IF;

    WITH ordered AS (
        SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) as new_seq
        FROM public.assessment_collections
        WHERE subject_slug = v_subject AND grade = v_grade
          AND (volume = v_volume OR (volume IS NULL AND v_volume IS NULL))
          AND (units = v_units OR (units IS NULL AND v_units IS NULL))
          AND (exam_type = v_exam_type OR (exam_type IS NULL AND v_exam_type IS NULL))
    )
    UPDATE public.assessment_collections
    SET sequence_number = ordered.new_seq,
        title = public.generate_assessment_title(v_subject, v_grade, v_volume, v_units, ordered.new_seq::INTEGER, v_exam_type)
    FROM ordered
    WHERE public.assessment_collections.id = ordered.id
      AND (
          public.assessment_collections.sequence_number IS DISTINCT FROM ordered.new_seq
          OR public.assessment_collections.title IS DISTINCT FROM public.generate_assessment_title(v_subject, v_grade, v_volume, v_units, ordered.new_seq::INTEGER, v_exam_type)
      );

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 3) Khôi phục/sửa tên cho TẤT CẢ collection (lesson lấy lại tên đúng, midterm giữ tên cố định)
UPDATE public.assessment_collections
SET title = public.generate_assessment_title(subject_slug, grade, volume, units, sequence_number, exam_type);
