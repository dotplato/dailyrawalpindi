import { client } from "@/lib/contentful";
import Navbar from "@/components/Navbar";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, Document } from "@contentful/rich-text-types";

interface Article {
  sys: { id: string };
  fields: {
    title: string;
    slug: string;
    description: Document; // Rich Text
    body?: Document;       // Rich Text (optional full content)
    image: { fields: { file: { url: string } } };
    publishedAt: string;
  };
}

async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  const res = await client.getEntries({
    content_type: "article",
    "fields.slug": slug,
    limit: 1,
  });

  if (!res.items.length) return null;
  const item = res.items[0];

  return {
    sys: { id: item.sys.id },
    fields: {
      title: item.fields.title as string,
      slug: item.fields.slug as string,
      description: item.fields.description as Document,
      body: (item.fields.body as Document) || undefined,
      image: item.fields.image as { fields: { file: { url: string } } },
      publishedAt: item.fields.publishedAt as string,
    },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await fetchArticleBySlug(params.slug);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4">
       
        <h1 className="text-xl font-bold mt-6">Article not found</h1>
      </div>
    );
  }

  const imgUrl = article.fields.image?.fields?.file?.url
    ? article.fields.image.fields.file.url.startsWith("//")
      ? `https:${article.fields.image.fields.file.url}`
      : article.fields.image.fields.file.url
    : "";

  return (
    <div className="max-w-4xl mx-auto px-4">
    

      <article className="mt-6">
        <h1 className="text-3xl font-bold mb-2">{article.fields.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          {new Date(article.fields.publishedAt).toLocaleString()}
        </p>

        {imgUrl && (
          <img
            src={imgUrl}
            alt={article.fields.title}
            className="w-full h-80 object-cover rounded mb-6"
          />
        )}

        {/* Rich Text description */}
        {article.fields.description && (
          <div className="prose max-w-none text-lg text-gray-700 leading-relaxed">
            {documentToReactComponents(article.fields.description)}
          </div>
        )}

        {/* Optional full body */}
        {article.fields.body && (
          <div className="prose max-w-none mt-6">
            {documentToReactComponents(article.fields.body)}
          </div>
        )}
      </article>
    </div>
  );
}
