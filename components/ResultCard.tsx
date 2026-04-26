interface ResultCardProps {
  title: string;
  value: string;
}

export function ResultCard({ title, value }: ResultCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-700">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-700">{value}</p>
    </article>
  );
}
