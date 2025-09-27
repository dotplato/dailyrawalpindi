// components/MustReadCarousel.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Item = {
  id: string;
  title: string;
  href: string;
  image: string;
};

export default function MustReadCarousel({ articles }: { articles: Item[] }) {
  const [index, setIndex] = useState(0);
  const len = articles.length;
  const autoplayRef = useRef<number | null>(null);

  // autoplay every 4s
  useEffect(() => {
    if (len <= 1) return;
    autoplayRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % len);
    }, 4000);
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, [len]);

  const goTo = (i: number) => setIndex(((i % len) + len) % len);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  if (!articles || articles.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold border-b pb-2">Must Read</h2>

      <div className="relative">
        {/* slide viewport */}
        <div className="overflow-hidden">
          {/* sliding container */}
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {articles.map((a) => (
              <div key={a.id} className="w-full flex-shrink-0 px-2">
                <Link href={a.href} className="block">
                  <div className="w-full h-64 md:h-80 bg-gray-100 rounded overflow-hidden">
                   
                    <Image
                      src={a.image}
                      alt={a.title}
                      width={1000}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="mt-2 font-semibold text-center line-clamp-2">
                    {a.title}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Controls (only when multiple slides) */}
        {len > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:bg-white"
            >
              ‹
            </button>

            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:bg-white"
            >
              ›
            </button>

            {/* dots */}
            <div className="flex justify-center gap-2 mt-3">
              {articles.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`w-2 h-2 rounded-full ${i === index ? "bg-black" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
