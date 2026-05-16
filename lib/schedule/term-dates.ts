/** Mốc năm học: Tuần 1 bắt đầu Thứ Hai 01/06/2026 (VN). */
export const TOAN_GRADE3_TERM_START = "2026-06-01";

const MS_DAY = 86_400_000;

export function parseLocalDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1, 12, 0, 0, 0);
}

/** Thứ Hai của Tuần `weekNumber` (tuần 1 = Thứ Hai đầu tiên = term_start nếu term_start là Thứ Hai). */
export function mondayOfSchoolWeek(
  termStartIso: string,
  weekNumber: number
): Date {
  const start = parseLocalDate(termStartIso);
  const monday = new Date(start);
  monday.setDate(start.getDate() + (weekNumber - 1) * 7);
  return monday;
}

/** Ngày học: Tuần W, weekday 1=Thứ Hai … 5=Thứ Sáu */
export function schoolDateForSlot(
  termStartIso: string,
  weekNumber: number,
  weekday: number
): Date {
  const mon = mondayOfSchoolWeek(termStartIso, weekNumber);
  const d = new Date(mon);
  d.setDate(mon.getDate() + (weekday - 1));
  return d;
}

export function formatVnDate(d: Date): string {
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/** Tuần lịch (1..11) chứa `date`, hoặc null nếu trước/sau kỳ */
export function weekNumberForDate(
  termStartIso: string,
  date: Date,
  totalWeeks: number
): number | null {
  const start = parseLocalDate(termStartIso);
  const t = date.getTime();
  const s = start.getTime();
  const diffDays = Math.floor((t - s) / MS_DAY);
  if (diffDays < 0) return null;
  const week = Math.floor(diffDays / 7) + 1;
  if (week < 1 || week > totalWeeks) return null;
  return week;
}
