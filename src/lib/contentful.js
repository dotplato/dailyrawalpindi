import { createClient } from "contentful";

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// ✅ Fetch all unique categories from articles
export async function fetchCategories() {
  const res = await client.getEntries({
    content_type: "article",
    select: "fields.category",
    limit: 1000,
  });

  // Extract unique category values
  const categories = [
    ...new Set(res.items.map((item) => item.fields.category)),
  ];

  // Capitalize helper
  function capitalize(word) {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  // Map into objects usable for navbar
  return categories.map((cat) => ({
    id: cat, // use category name as ID
    title: capitalize(cat), // ✅ capitalized for display
    slug: cat.toLowerCase(), // ✅ lowercase for URL
  }));
}





export async function fetchArticlesByCategory(categorySlug, limit = 100) {
  const res = await client.getEntries({
    content_type: "article",
    "fields.category": categorySlug, // ✅ just match the string value
    order: "-fields.publishedAt",
    limit,
  });

  return res.items;
}


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
    include: 2, // includes linked references like category + rich text
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
