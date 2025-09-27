import { fetchArticlesByCategory, fetchAds } from "@/lib/contentful";
import FeaturedNews from "@/components/FeaturedNews";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

interface Article {
  sys: { id: string };
  fields: {
    title: string;
    slug: string;
    description1: string;
    image: { fields: { file: { url: string } } };
    publishedAt: string;
    featured?: boolean; // ✅ add featured flag
  };
}

interface Ad {
  id: string;
  placement: string;
  image: string;
  link: string;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // ✅ Fetch articles + ads
  const [entries, ads] = await Promise.all([
    fetchArticlesByCategory(category),
    fetchAds(5),
  ]);

  // ✅ Map ads
  const adsMapped: Ad[] = ads.map((ad: any) => {
    const rawUrl = ad.fields.image?.fields?.file?.url;
    const normalizedUrl = rawUrl
      ? rawUrl.startsWith("//")
        ? `https:${rawUrl}`
        : rawUrl
      : "https://placehold.co/400x300/png";

    return {
      id: ad.sys.id,
      placement: ad.fields.placement,
      image: normalizedUrl,
      link: ad.fields.link || "#",
    };
  });

  const adSidebar = adsMapped.find((ad) => ad.placement === "sidebar");
  const adInline = adsMapped.find((ad) => ad.placement === "inline");

  // ✅ Map articles
  const articles: Article[] = Array.isArray(entries)
    ? entries.map((entry: any) => {
        const desc = entry.fields.description1
          ? typeof entry.fields.description1 === "string"
            ? entry.fields.description1
            : documentToPlainTextString(entry.fields.description1)
          : "";

        return {
          sys: { id: entry.sys.id },
          fields: {
            title: entry.fields.title,
            slug: entry.fields.slug,
            description1: desc,
            image: entry.fields.image,
            publishedAt: entry.fields.publishedAt,
            featured: entry.fields.featured || false, // ✅ keep featured flag
          },
        };
      })
    : [];

  // ✅ Featured logic (fallback to latest 5 if none)
  const featuredArticles =
    articles.filter((a) => a.fields.featured) || [];
  const featuredForDisplay =
    featuredArticles.length > 0 ? featuredArticles : articles.slice(0, 5);

  if (!articles.length) {
    return (
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold border-l-4 border-blue-600 pl-2 my-4 capitalize">
          {category}
        </h1>
        <p>No articles found for this category.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold border-l-4 border-blue-600 pl-2 my-4 capitalize">
        {category}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side */}
        <div className="lg:col-span-1">
          {adSidebar && (
            <div className="mb-4 w-full flex justify-center">
              <Link href={adSidebar.link}>
                <img
                  src={adSidebar.image}
                  alt="Sidebar Ad"
                  className="w-full object-contain"
                />
              </Link>
            </div>
          )}
          <FeaturedNews articles={featuredForDisplay} />
        </div>

        {/* Right side */}
        <div className="lg:col-span-2">
          {articles[0] && (
            <Link
              href={`/article/${articles[0].fields.slug}`}
              className="flex gap-4 mb-6"
            >
              <img
                src={
                  (articles[0].fields.image.fields.file.url || "").startsWith(
                    "//"
                  )
                    ? `https:${articles[0].fields.image.fields.file.url}`
                    : articles[0].fields.image.fields.file.url
                }
                alt={articles[0].fields.title}
                className="w-48 h-32 object-cover rounded"
              />
              <div>
                <h2 className="font-bold text-xl">
                  {articles[0].fields.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date(articles[0].fields.publishedAt).toLocaleString()}
                </p>
                <p className="text-gray-600 line-clamp-2">
                  {articles[0].fields.description1}
                </p>
              </div>
            </Link>
          )}

          {/* ✅ Inline Ad from CMS */}
          {adInline && (
            <div className="my-4 w-full flex justify-center">
              <Link href={adInline.link}>
                <img
                  src={adInline.image}
                  alt="Inline Ad"
                  className="w-full object-contain"
                />
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.slice(1).map((article) => (
              <ArticleCard key={article.sys.id} article={article.fields} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
