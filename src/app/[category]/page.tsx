import { fetchArticlesByCategory } from "@/lib/contentful";
import FeaturedNews from "@/components/FeaturedNews";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";

interface Article {
  sys: { id: string };
  fields: {
    title: string;
    slug: string;
    description: string;
    image: { fields: { file: { url: string } } };
    publishedAt: string;
  };
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const entries = await fetchArticlesByCategory(params.category);

  const articles: Article[] = Array.isArray(entries)
    ? entries.map((entry: any) => ({
        sys: { id: entry.sys.id },
        fields: {
          title: entry.fields.title,
          slug: entry.fields.slug,
          description: entry.fields.description,
          image: entry.fields.image,
          publishedAt: entry.fields.publishedAt,
        },
      }))
    : [];

  if (!articles.length) {
    return (
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold border-l-4 border-blue-600 pl-2 my-4 capitalize">
          {params.category}
        </h1>
        <p>No articles found for this category.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold border-l-4 border-blue-600 pl-2 my-4 capitalize">
        {params.category}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side */}
        <div className="lg:col-span-1">
          <div className="mb-4">
            <img src="https://placehold.co/300x250/png?text=Ad" alt="Ad" className="w-full" />
          </div>
          <FeaturedNews articles={articles.slice(0, 5)} />
        </div>

        {/* Right side */}
        <div className="lg:col-span-2">
          {articles[0] && (
            <Link href={`/article/${articles[0].fields.slug}`} className="flex gap-4 mb-6">
              <img
                src={
                  (articles[0].fields.image.fields.file.url || "").startsWith("//")
                    ? `https:${articles[0].fields.image.fields.file.url}`
                    : articles[0].fields.image.fields.file.url
                }
                alt={articles[0].fields.title}
                className="w-48 h-32 object-cover rounded"
              />
              <div>
                <h2 className="font-bold text-xl">{articles[0].fields.title}</h2>
                {/* Updated time */}
                <p className="text-sm text-gray-500">
                  {new Date(articles[0].fields.publishedAt).toLocaleString()}
                </p>
                {/* Two-line description */}
                <p className="text-gray-600 line-clamp-2">{articles[0].fields.description}</p>
              </div>
            </Link>
          )}

          <img src="https://placehold.co/728x90/png?text=Ad" alt="Ad" className="w-full my-4" />

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
