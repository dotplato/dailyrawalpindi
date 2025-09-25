interface Article {
  title: string;
  description?: string;
  publishedAt: string | number | Date;
  image: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

export default function ArticleCard({ article }: { article: Article }) {
    return (
      <div className="flex gap-3">
        <img
          src={(article.image.fields.file.url || "").replace(/^\/\//, "https://")}
          alt={article.title}
          className="w-24 h-16 object-cover rounded"
        />
        <div>
          <h3 className="font-semibold text-sm">{article.title}</h3>
          {article.description ? (
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
              {article.description}
            </p>
          ) : null}
          <p className="text-xs text-gray-500">
            {new Date(article.publishedAt).toLocaleString()}
          </p>
        </div>
      </div>
    );
  }
  