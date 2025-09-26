import { createClient } from "contentful";

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// If your categories in Contentful are lowercase (politics, sports etc.),
// keep them lowercase here.
const CATEGORY_MAP = {
  politics: "politics",
  sports: "sports",
  entertainment: "entertainment",
  technology: "technology",
};

export async function fetchArticlesByCategory(category, limit = 100) {
  const key = category.toLowerCase();
  const value = CATEGORY_MAP[key] || category;
  const res = await client.getEntries({
    content_type: "article",
    "fields.category": value,
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
    // Make sure all fields are included, including rich text
    include: 2
  });
  return res.items[0] || null;
}