interface Article {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    // Add other fields as needed
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
          {articles.map((article) => (
            <li key={article.sys.id} className="mb-3">
              <p className="text-sm hover:text-blue-600 cursor-pointer">
                {article.fields.title}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  