import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
 
  return (
    <nav className="flex justify-center items-center gap-6 py-4 shadow">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col items-center gap-4">
            <Link href="/" className="inline-flex items-center" aria-label="Home">
              <Image src="/next.svg" alt="Site logo" width={140} height={30} />
            </Link>
            <nav className="w-full">
              <ul className="flex items-center justify-center gap-6 text-sm sm:text-base">
                <li>
                  <Link href="/" className="hover:underline">Home</Link>
                </li>
                <li>
                  <Link href="/politics" className="hover:underline">Politics</Link>
                </li>
                <li>
                  <Link href="/sports" className="hover:underline">Sports</Link>
                </li>
                <li>
                  <Link href="/entertainment" className="hover:underline">Entertainment</Link>
                </li>
                <li>
                  <Link href="/technology" className="hover:underline">Technology</Link>
                </li>
              </ul>
            </nav>
          </div>
    </nav>
  );
}
