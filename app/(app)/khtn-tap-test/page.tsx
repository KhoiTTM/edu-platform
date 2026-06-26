"use client";

import { useState } from "react";
import { KHTNWorkbookPractice } from "@/components/KHTNWorkbookPractice";

export default function KHTNTestPage() {
  const [bookPage, setBookPage] = useState(47); // Q2.4 is on book page 47

  return (
    <main className="min-h-screen bg-[#0f172a] text-white p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">
          Test: KHTN Workbook Practice
        </h1>

        <div className="mb-6 bg-slate-800 p-4 rounded-lg">
          <p className="text-slate-300 mb-3">
            <strong>Test Case:</strong> Select question 2.4, pick option 3 (correct answer: C/index 2), click Check
          </p>
          <div className="space-y-2 text-sm text-slate-400">
            <p>✓ Should show: "✓ Đúng!"</p>
            <p>✓ Expected: Multiple choice answer checking works</p>
          </div>
        </div>

        <div className="h-[700px] flex flex-col">
          <KHTNWorkbookPractice
            lessonSlug="bai-1"
            currentBookPage={bookPage}
          />
        </div>
      </div>
    </main>
  );
}
