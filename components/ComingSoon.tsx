/** Chỗ giữ màn cho các chunk sau, để bottom nav không dẫn vào 404 */
export default function ComingSoon({
  title,
  note,
}: {
  title: string;
  note: string;
}) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-8 text-center">
      <img
        src="/art/pose-think.webp"
        alt="かんがえるカメ"
        className="h-36 w-auto object-contain"
      />
      <h1 className="mt-3 text-xl font-bold text-ink">{title}</h1>
      <p className="mt-2 text-sm text-ink-soft">{note}</p>
    </main>
  );
}
