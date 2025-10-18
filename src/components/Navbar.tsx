// Navbar.tsx
import { fetchCategories } from "@/lib/contentful";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const categories = await fetchCategories();
  const safeCategories = categories ?? [];

  return <NavbarClient categories={safeCategories} />;
}
