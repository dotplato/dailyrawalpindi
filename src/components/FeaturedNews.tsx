import Link from "next/link";

interface Article {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    slug?: string;
  };
}

interface FeaturedNewsProps {
  articles: Article[];
}

export default function FeaturedNews({ articles }: FeaturedNewsProps) {
  return (
    <div>
      <h2 className="font-bold text-lg border-b pb-2 mb-2">Featured News</h2>
      <ul>
        {articles.map((article) => {
          const href = article.fields.slug
            ? `/article/${article.fields.slug}`
            : undefined;
          const Title = (
            <p className="text-sm hover:text-blue-600 cursor-pointer">
              {article.fields.title}
            </p>
          );
          return (
            <li key={article.sys.id} className="mb-3">
              {href ? <Link href={href}>{Title}</Link> : Title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
