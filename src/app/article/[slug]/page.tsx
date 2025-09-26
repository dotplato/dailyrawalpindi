import { fetchArticleBySlug } from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Document } from "@contentful/rich-text-types";

interface Article {
  sys: { id: string };
  fields: {
    title: string;
    subtitle?: string;
    slug: string;
    description1?: Document | string;
    description?: Document | string;
    body?: Document;
    image: { fields: { file: { url: string }; description?: string } };
    imageDescription?: string;
    author?: string;
    publishedAt: string;
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const rawArticle = await fetchArticleBySlug(slug);

  if (!rawArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-xl font-bold mt-6">Article not found</h1>
      </div>
    );
  }

  const f = rawArticle.fields as any;

  // Prefer a real Rich Text document; fallback to string from either field
  const richDoc: Document | undefined = [f.description1, f.description, f.body].find(
    (v: any) => v && typeof v === "object" && v.nodeType === "document"
  );
  const plainText: string | undefined = [f.description1, f.description].find(
    (v: any) => typeof v === "string" && v.trim().length > 0
  );

  const article: Article = {
    sys: { id: rawArticle.sys.id },
    fields: {
      title: f.title as string,
      subtitle: f.subtitle as string | undefined,
      slug: f.slug as string,
      description1: f.description1 as Document | string | undefined,
      description: f.description as Document | string | undefined,
      body: (f.body as Document) || undefined,
      image: f.image as { fields: { file: { url: string }; description?: string } },
      imageDescription: (f.imageDescription as string | undefined) ?? (f.image?.fields?.description as string | undefined),
      author: (f.author as string | undefined) ?? "Sports Desk",
      publishedAt: f.publishedAt as string,
    },
  };

  const imgUrl = article.fields.image?.fields?.file?.url
    ? article.fields.image.fields.file.url.startsWith("//")
      ? `https:${article.fields.image.fields.file.url}`
      : article.fields.image.fields.file.url
    : "";


  const formattedDate = new Date(article.fields.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return (
    <div className="max-w-4xl mx-auto px-4">
      <article className="mt-6">
        <h1 className="text-3xl font-bold mb-2">{article.fields.title}</h1>
        
        {article.fields.subtitle && (
          <h2 className="text-xl text-gray-600 mb-4">{article.fields.subtitle}</h2>
        )}
        
        {/* Byline and date only above the image */}
        <p className="text-sm text-gray-700 mb-4">
          By {article.fields.author} <span className="mx-2">•</span> {formattedDate}
        </p>

        {imgUrl && (
          <div className="mb-6">
            <img
              src={imgUrl}
              alt={article.fields.title}
              className="w-full h-80 object-cover rounded"
            />
            {article.fields.imageDescription ? (
              <p className="text-sm text-gray-600 mt-2 italic">
                {article.fields.imageDescription}
              </p>
            ) : null}
          </div>
        )}

        {/* Full description content below the image */}
        {richDoc ? (
          <div className="prose max-w-none text-gray-800 leading-relaxed">
            {documentToReactComponents(richDoc)}
          </div>
        ) : plainText ? (
          <div className="prose max-w-none text-gray-800 leading-relaxed">
            <p>{plainText}</p>
          </div>
        ) : (
          <div className="bg-yellow-100 p-4 mb-6 border rounded">
            <em>No description provided for this article.</em>
          </div>
        )}
      </article>
    </div>
  );
}
