import fs from "fs/promises";
import path from "path";
import { TiengAnh7QuizClient } from "@/components/flipbook/TiengAnh7QuizClient";

async function loadUnitData(unit: number) {
  try {
    const filePath = path.join(
      process.cwd(),
      "content",
      "workbooks",
      `tienganh7-sbt-unit${unit}.json`
    );
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default async function TiengAnh7QuizUnitPage({
  params,
}: {
  params: Promise<{ unit: string }>;
}) {
  const { unit } = await params;
  const unitNum = Number(unit);
  const data = await loadUnitData(unitNum);

  const breadcrumbs = [
    { label: "Trang chủ", href: "/dashboard" },
    { label: "Luyện tập", href: `/luyen-tap/tieng-anh-7?grade=7` },
  ];

  if (!data) {
    return (
      <div className="h-[calc(100vh-80px)] p-6 bg-slate-950 overflow-y-auto flex items-center justify-center">
        <p className="text-slate-400">Chưa có dữ liệu cho Unit {unitNum}.</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-80px)] p-6 bg-slate-950 overflow-y-auto">
      <TiengAnh7QuizClient
        data={data}
        breadcrumbs={breadcrumbs}
        pdfUrl="https://drive.google.com/file/d/1VUrweOeuNiJv3lXmi2xXE2cqYjyIdFOQ/view?usp=sharing"
      />
    </div>
  );
}
