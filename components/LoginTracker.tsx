"use client";

import { useEffect } from "react";

const SESSION_FLAG = "eduverse_login_logged";

/** Ghi nhận 1 sự kiện "login" vào learning_events mỗi khi mở phiên trình duyệt mới. */
export function LoginTracker() {
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_FLAG)) return;
    sessionStorage.setItem(SESSION_FLAG, "1");

    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "login",
        subject_slug: "system",
        metadata: {},
      }),
    }).catch(() => {
      // Best-effort — không chặn trải nghiệm nếu ghi log thất bại
      sessionStorage.removeItem(SESSION_FLAG);
    });
  }, []);

  return null;
}
