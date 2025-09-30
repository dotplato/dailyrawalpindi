// Footer.tsx
import { fetchCategories } from "@/lib/contentful";
import Link from "next/link";

export default async function Footer() {
  const categories = await fetchCategories();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 text-sm text-gray-700 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 2 cols centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto text-center sm:text-left">
          {/* Column 1: Sections */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Sections</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/${cat.slug}`} className="hover:underline">
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: About */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">About</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/AboutUs" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/ContactUs" className="hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="border-t border-gray-200 mt-6">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Dailyrawalpindi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
