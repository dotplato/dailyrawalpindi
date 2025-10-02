// Navbar.tsx
import { fetchCategories } from "@/lib/contentful";
import Link from "next/link";

export default async function Navbar() {
  const categories = await fetchCategories();
  const safeCategories = categories ?? [];

  return (
    <nav className="border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col items-center gap-4">
        {/* Logo (always centered) */}
        <Link href="/" className="inline-flex items-center" aria-label="Home">
          <img src="/next.svg" alt="Site logo" width={140} height={30} />
        </Link>

        {/* Nav Links */}
        <nav className="w-full">
          <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            {safeCategories.length > 0 ? (
              safeCategories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/${cat.slug}`} className="hover:underline">
                    {cat.title}
                  </Link>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No Categories</li>
            )}
          </ul>
        </nav>
      </div>
    </nav>
  );
}
