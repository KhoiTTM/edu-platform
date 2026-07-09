// Quy tắc đặt tên chuẩn cho assessment_collections / exams, dùng chung cho mọi script seed.
//
// Kể từ migration 053, trigger DB tự sinh title đã bị xoá — "title do seeder chỉ định,
// không tự sinh nữa" (xem supabase/migrations/053_skip_autotitle_for_reflex.sql). Vì vậy
// MỌI script seed phải tự gọi hàm này để đặt title, không có tầng bảo vệ nào ở DB nữa.
//
// Cấu trúc: "{Tên môn} {Lớp} - {Nhóm luyện tập} - {Vị trí trong nhóm}[ - Đề {STT}]"
// Ví dụ: "KHTN 7 - Luyện theo sách bài tập - Bài 2"
//        "Toán 7 - Luyện tập theo bài - Bài 4 - Đề 01"
//        "Toán 7 - Ôn tập giữa kỳ - Đề 01"

export type ExamGroup =
  | "sbt" // Luyện theo sách bài tập — 1 vị trí = 1 đề cố định, bám sát nội dung sách (Tiếng Anh 7, KHTN 7)
  | "bank" // Luyện tập theo bài — ngân hàng câu hỏi, 1 vị trí có thể có nhiều "Đề" rút mẫu (Toán 7, Toán 3)
  | "review" // Ôn tập
  | "midterm" // Ôn tập giữa kỳ
  | "final" // Ôn tập cuối kỳ
  | "reflex" // Luyện phản xạ
  | "listening" // Luyện nghe
  | "lesson"; // Luyện theo bài học

const GROUP_LABELS: Record<ExamGroup, string> = {
  sbt: "Luyện theo sách bài tập",
  bank: "Luyện tập theo bài",
  review: "Ôn tập",
  midterm: "Ôn tập giữa kỳ",
  final: "Ôn tập cuối kỳ",
  reflex: "Luyện phản xạ",
  listening: "Luyện nghe",
  lesson: "Luyện theo bài học",
};

// exam_type lưu trong DB không có giá trị 'sbt'/'bank' riêng (cả hai đều dùng exam_type=NULL) —
// map ngược lại đây chỉ dùng để tính "canonical" exam_type cột DB tương ứng với mỗi group.
export const GROUP_TO_EXAM_TYPE: Record<ExamGroup, string | null> = {
  sbt: null,
  bank: null,
  review: "review",
  midterm: "midterm",
  final: "final",
  reflex: "reflex",
  listening: "listening",
  lesson: "lesson",
};

export interface BuildExamTitleInput {
  /** Tên môn hiển thị, đã kèm lớp — ví dụ "KHTN 7", "Tiếng Anh 7", "Toán 7". */
  subjectLabel: string;
  group: ExamGroup;
  /** Vị trí trong nhóm — ví dụ "Bài 2", "Unit 1: Hobbies", "Chương 3 - Bài 8". Bỏ trống nếu nhóm không gắn với 1 vị trí cụ thể (VD "Ôn tập giữa kỳ"). */
  position?: string;
  /** Số thứ tự đề — CHỈ truyền khi 1 vị trí có nhiều đề khác nhau (group="bank", hoặc nhiều đề ôn tập). Bỏ qua với group="sbt" (luôn đúng 1 đề/vị trí). */
  examSeq?: number;
}

export function buildExamTitle({ subjectLabel, group, position, examSeq }: BuildExamTitleInput): string {
  const parts = [subjectLabel, GROUP_LABELS[group]];
  if (position) parts.push(position);
  if (examSeq !== undefined) parts.push(`Đề ${String(examSeq).padStart(2, "0")}`);
  return parts.join(" - ");
}
