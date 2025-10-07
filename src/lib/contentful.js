

import { createClient } from "contentful";
if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error("❌ Missing Contentful environment variables. Check .env.local");
}

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Fetch all unique categories
export async function fetchCategories() {
  try {
    const res = await client.getEntries({
      content_type: "article",
      select: "fields.category",
      limit: 1000,
    });

    const categories = [...new Set(res.items.map((item) => item.fields.category))].filter(Boolean);

    function capitalize(word) {
      if (!word) return "";
      return word.charAt(0).toUpperCase() + word.slice(1);
    }

    return categories.map((cat) => ({
      id: String(cat),
      title: capitalize(cat),
      slug: String(cat).toLowerCase(),
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // ✅ always return array
  }
}


// Fetch articles by category (or all if category is "latest")
// src/lib/contentful.js
export async function fetchArticlesByCategory(categorySlug, limit = 100) {
  try {
    const query = {
      content_type: "article",
      order: "-fields.publishedAt",
      limit, // ✅ add support for limiting results
    };

    // Apply category filter only if not "latest"
    if (categorySlug && categorySlug.toLowerCase() !== "latest") {
      query["fields.category"] = categorySlug;
    }

    const entries = await client.getEntries(query);
    let articles = entries.items || [];

    // ✅ Special filter for "latest"
    if (categorySlug && categorySlug.toLowerCase() === "latest") {
      const now = new Date();
      const lastMonth = now.getMonth() - 1;
      const yearOfLastMonth =
        lastMonth === -1 ? now.getFullYear() - 1 : now.getFullYear();
      const correctMonth = lastMonth === -1 ? 11 : lastMonth;

      articles = articles.filter((entry) => {
        const publishedDate = new Date(entry.fields.publishedAt);
        return (
          publishedDate.getMonth() === correctMonth &&
          publishedDate.getFullYear() === yearOfLastMonth
        );
      });
    }

    return articles;
  } catch (error) {
    console.error("Error fetching articles by category:", error);
    return [];
  }
}


// Other helpers
export async function fetchLatestArticles(limit = 20) {
  const res = await client.getEntries({
    content_type: "article",
    order: "-fields.publishedAt",
    limit,
  });
  return res.items;
}

export async function fetchArticleBySlug(slug) {
  const res = await client.getEntries({
    content_type: "article",
    "fields.slug": slug,
    limit: 1,
    include: 2,
  });
  return res.items[0] || null;
}

export async function fetchAds(limit = 10) {
  const res = await client.getEntries({
    content_type: "ad",
    limit,
  });
  return res.items;
}

export async function fetchMustReadArticles(limit = 10) {
  const res = await client.getEntries({
    content_type: "article",
    "fields.mustRead": true,
    order: "-sys.createdAt",
    limit,
  });
  return res.items;
}
