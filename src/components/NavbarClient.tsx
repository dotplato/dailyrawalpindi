"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // hamburger icons
import { FaFacebook, FaTwitter, FaGithub } from "react-icons/fa"; // social icons

export default function NavbarClient({ categories }: { categories: any[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200 bg-white shadow-sm">
      {/* Top row: Hamburger (mobile) + Logo + Social (right) */}
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left: Hamburger (mobile only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden p-2 rounded-md hover:bg-gray-100"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Center: Logo (always centered in flex) */}
        <Link href="/" className="inline-flex items-center mx-auto" aria-label="Home">
          <img src="/drlogo-2.png" alt="Site logo" width={140} height={30} />
        </Link>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook className="h-5 w-5 text-gray-600 hover:text-blue-600" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter className="h-5 w-5 text-gray-600 hover:text-sky-500" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub className="h-5 w-5 text-gray-600 hover:text-black" />
          </a>
        </div>
      </div>

      {/* Desktop Menu (Logo already above, so categories go in separate row) */}
      <div className="hidden sm:block border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            {categories.length > 0 ? (
              categories.map((cat) => (
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
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="sm:hidden border-t border-gray-200 bg-white">
          <ul className="flex flex-col gap-3 p-4 text-sm">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            {categories.length > 0 ? (
              categories.map((cat) => (
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
        </div>
      )}
    </nav>
  );
}
