import BookList from "@/components/BookList";

export default function BookPage() {
  return (
    <main className="flex flex-1 flex-col px-6 pt-6">
      <h1 className="text-[26px] font-bold text-ink">ことばノート</h1>
      <BookList />
    </main>
  );
}
