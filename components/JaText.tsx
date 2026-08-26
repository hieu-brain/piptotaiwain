/**
 * Nghĩa tiếng Nhật hay có phần trong ngoặc để chú thích, ví dụ
 * 悠遊カード（ICカード）. Để nguyên một dòng thì thẻ bị vỡ chữ, nên tách
 * phần ngoặc xuống dòng và làm nhạt đi.
 */
export default function JaText({ text }: { text: string }) {
  const match = text.match(/^(.+?)（(.+)）$/);
  if (!match) return <>{text}</>;

  return (
    <>
      {match[1]}
      <span className="block text-[0.82em] font-normal opacity-70">
        （{match[2]}）
      </span>
    </>
  );
}
