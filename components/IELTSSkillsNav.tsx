import Link from 'next/link';

const skills = [
  { key: 'listening', label: 'Listening', color: 'bg-sky-500' },
  { key: 'reading', label: 'Reading', color: 'bg-amber-500' },
  { key: 'writing', label: 'Writing', color: 'bg-fuchsia-500' },
  { key: 'speaking', label: 'Speaking', color: 'bg-emerald-500' },
  { key: 'grammar', label: 'Grammar', color: 'bg-rose-500' },
];

export default function IELTSSkillsNav({ base = '/hoc-tap/mindset-ielts' }: { base?: string }) {
  return (
    <nav className="flex gap-2 items-center">
      {skills.map((s) => (
        <Link key={s.key} href={`${base}/${s.key}`} className={`${s.color} text-white px-3 py-1 rounded-md`}>{s.label}</Link>
      ))}
    </nav>
  );
}
