// Navbar.tsx
import { fetchCategories } from "@/lib/contentful";
import Link from "next/link";

export default async function Navbar() {
  const categories = await fetchCategories();

  return (
    <nav className="flex justify-center items-center gap-6 py-4 shadow">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col items-center gap-4">
        <Link href="/" className="inline-flex items-center" aria-label="Home">
          <img src="/next.svg" alt="Site logo" width={140} height={30} />
        </Link>
        <nav className="w-full">
          <ul className="flex items-center justify-center gap-6 text-sm sm:text-base">
            <li>
              <Link href="/" className="hover:underline">Home</Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link href={`/${cat.slug}`} className="hover:underline">
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </nav>
  );
}
