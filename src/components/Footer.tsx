// Footer.tsx
import { fetchCategories } from "@/lib/contentful";
import Link from "next/link";

export default async function Footer() {
  const categories = await fetchCategories();

  return (
    <footer className="border-t border-gray-300 bg-gray-50 text-sm text-gray-700 mt-10">
      {/* Top section: Logo + Navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Mobile: stacked, Desktop: centered shrink cols */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 gap-10 text-center
                          md:grid-flow-col md:auto-cols-max md:gap-16 md:text-left">
            
            {/* Column 1: Logo */}
            <div className="min-w-[150px] mx-auto md:mx-0">
              <Link href="/" aria-label="Home">
                <img
                  src="/drlogo-1.png"
                  alt="Dailyrawalpindi logo"
                  className="h-32 w-auto mx-auto md:mx-0"
                />
              </Link>
            </div>

            {/* Column 2: Sections */}
            <div className="min-w-[180px]">
              <h4 className="uppercase text-xs font-bold text-gray-500 mb-3">
                Sections
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                {categories?.map((cat) => (
                  <li key={cat.id}>
                    <Link href={`/${cat.slug}`} className="hover:underline">
                      {cat.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: About */}
            <div className="min-w-[180px]">
              <h4 className="uppercase text-xs font-bold text-gray-500 mb-3">
                About
              </h4>
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
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 py-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Dailyrawalpindi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
