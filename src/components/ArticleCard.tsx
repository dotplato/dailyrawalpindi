import Link from "next/link";

interface Article {
  title: string;
  slug: string;
  description1?: string;
  publishedAt: string | number | Date;
  image?: {
    fields?: {
      file?: {
        url?: string;
      };
    };
  };
}

export default function ArticleCard({ article }: { article: Article }) {
  const href = `/article/${article.slug}`;
  const img =
    (article.image?.fields?.file?.url || "https://placehold.co/200x150/png").replace(
      /^\/\//,
      "https://"
    );

  return (
    <Link href={href} className="flex gap-3 group">
      <img
        src={img}
        alt={article.title}
        className="w-24 h-16 object-cover rounded"
      />
      <div>
        <h3 className="font-semibold text-sm group-hover:underline">
          {article.title}
        </h3>
        {article.description1 ? (
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
            {article.description1}
          </p>
        ) : null}
        <p className="text-xs text-gray-500">
          {new Date(article.publishedAt).toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
