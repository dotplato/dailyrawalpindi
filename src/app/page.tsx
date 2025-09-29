import Image from "next/image";
import Link from "next/link";
import {
  fetchLatestArticles,
  fetchArticlesByCategory,
  fetchAds,
  fetchCategories, // ✅ now fetching categories dynamically
} from "@/lib/contentful";
import MustReadCarousel from "@/components/MustReadCarousel";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

type Article = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  href?: string;
  author?: string;
  editorPick?: boolean;
};

type Ad = {
  id: string;
  placement: string;
  image: string;
  link: string;
};

function TitleOnlyItem({ a }: { a: Article }) {
  return (
    <Link href={a.href || "#"} className="block hover:text-blue-600">
      <h3 className="font-medium text-sm leading-snug">{a.title}</h3>
    </Link>
  );
}

function ListItem({ a }: { a: Article }) {
  return (
    <li className="py-4 border-b border-gray-400">
      <Link href={a.href || "#"} className="block">
        <h2 className="text-base font-semibold leading-snug mb-2">{a.title}</h2>
        <div className="grid grid-cols-[120px_1fr] gap-3 items-start">
          {a.image && (
            <Image
              src={a.image}
              alt={a.title}
              width={120}
              height={80}
              className="rounded w-[120px] h-[80px] object-cover"
            />
          )}
          <div className="flex flex-col justify-start">
            {a.subtitle && (
              <p className="text-sm text-gray-700 leading-snug line-clamp-3">
                {a.subtitle}
              </p>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
}

function EditorsPickItem({ a }: { a: Article }) {
  return (
    <li className="flex justify-between items-start py-3 border-b border-gray-200">
      <div className="flex-1 pr-3">
        <Link href={a.href || "#"} className="block">
          <h3 className="font-semibold text-sm leading-snug hover:text-blue-600">
            {a.title}
          </h3>
        </Link>
        {a.author && <p className="text-xs text-blue-700 mt-1">{a.author}</p>}
      </div>
      {a.image && (
        <Image
          src={a.image}
          alt={a.title}
          width={48}
          height={48}
          className="w-12 h-12 object-cover rounded"
        />
      )}
    </li>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-bold text-lg border-l-4 pl-2 border-black">
      {children}
    </h2>
  );
}

export default async function Home() {
  const [latest, categories, ads] = await Promise.all([
    fetchLatestArticles(20),
    fetchCategories(), // ✅ all categories dynamically
    fetchAds(5),
  ]);

  // ✅ Normalize ads
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

  const adTop = adsMapped.find((ad) => ad.placement === "top");
  const adSide = adsMapped.find((ad) => ad.placement === "sidebar");

  // ✅ Article mapper
  const mapEntry = (e: any): Article => {
    const rawUrl = e.fields.image?.fields?.file?.url;
    const normalizedUrl = rawUrl
      ? rawUrl.startsWith("//")
        ? `https:${rawUrl}`
        : rawUrl
      : "https://placehold.co/400x300/png";

    const desc = e.fields.description
      ? typeof e.fields.description === "string"
        ? e.fields.description
        : documentToPlainTextString(e.fields.description)
      : "";

    return {
      id: e.sys.id,
      title: e.fields.title,
      subtitle: e.fields.subtitle || "",
      description: desc,
      image: normalizedUrl,
      href: e.fields.slug ? `/article/${e.fields.slug}` : undefined,
      author: e.fields.author || "",
      editorPick: e.fields.editorPick || false,
    };
  };

  const latestMapped = latest.map(mapEntry);

  const lead: Article | undefined = latestMapped[0];
  const leftList: Article[] = latestMapped.slice(1, 5);
  const topStories: Article[] = latestMapped.slice(5, 9);
  const editorsPicks: Article[] = latestMapped.filter((a) => a.editorPick).slice(0, 8);
  const videoMain: Article | undefined = latestMapped[7];
  const videoList: Article[] = latestMapped.slice(8, 12);
  const headlines: Article[] = latestMapped.slice(12, 18);

  // ✅ Build dynamic bottom categories
  const bottomCats = await Promise.all(
    categories.map(async (cat) => {
      const articles = await fetchArticlesByCategory(cat.slug, 5);
      return {
        title: cat.title,
        href: `/${cat.slug}`,
        items: articles.map(mapEntry),
      };
    })
  );

  // ✅ Must Read slides
  const mustReadArticles = bottomCats
    .map((cat) => cat.items[0])
    .filter(Boolean)
    .map((a) => ({
      id: a!.id,
      title: a!.title,
      href: a!.href || "#",
      image: a!.image,
    }));

  return (
    <div className="space-y-8">
      {/* Top banner */}
      {adTop && (
        <div className="w-full mb-20">
          <Link href={adTop.link}>
            <Image
              src={adTop.image}
              alt="Top Ad"
              width={2070}
              height={100}
              className="w-full h-[200px] object-fill"
            />
          </Link>
        </div>
      )}

      {/* Hero section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="space-y-4">
          {lead && (
            <Link href={lead.href || "#"} className="block pb-4 border-b border-gray-400">
              <Image
                src={lead.image}
                alt={lead.title}
                width={800}
                height={450}
                className="w-full h-auto rounded"
              />
              <h1 className="mt-3 text-xl font-bold leading-snug">{lead.title}</h1>
              <p className="text-sm text-black/70 mt-1 line-clamp-2">{lead.description}</p>
            </Link>
          )}
          <ul>
            {leftList.map((a) => (
              <ListItem key={a.id} a={a} />
            ))}
          </ul>
        </section>

        <section>
          <SectionTitle>Top Stories</SectionTitle>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topStories.map((a) => (
              <Link key={a.id} href={a.href || "#"} className="block">
                <Image src={a.image} alt={a.title} width={480} height={320} className="w-full h-auto rounded" />
                <h3 className="mt-2 font-semibold text-sm leading-snug ">{a.title}</h3>
                {a.description && <p className="text-sm text-black/70 mt-1 line-clamp-2">{a.description}</p>}
              </Link>
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          {adSide && (
            <div className="w-full flex justify-center">
              <Link href={adSide.link}>
                <Image src={adSide.image} alt="Sidebar Ad" width={300} height={250} />
              </Link>
            </div>
          )}
          <div>
            <SectionTitle>Editor's Picks</SectionTitle>
            <ul className="mt-3">
              {editorsPicks.map((a) => (
                <EditorsPickItem key={a.id} a={a} />
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Must Read */}
      <MustReadCarousel articles={mustReadArticles} />

      {/* Videos + Headlines */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SectionTitle>Videos</SectionTitle>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            {videoMain && (
              <Link href={videoMain.href || "#"} className="md:col-span-2 block">
                <Image src={videoMain.image} alt={videoMain.title} width={900} height={500} className="w-full h-auto rounded" />
                <h3 className="mt-2 font-semibold text-lg leading-snug">{videoMain.title}</h3>
              </Link>
            )}
            <ul className="divide-y divide-black/[.08]">
              {videoList.map((a) => (
                <ListItem key={a.id} a={a} />
              ))}
            </ul>
          </div>
        </div>
        <div>
          <SectionTitle>News Headlines</SectionTitle>
          <ul className="mt-3 divide-y divide-black/[.08]">
            {headlines.map((a) => (
              <ListItem key={a.id} a={a} />
            ))}
          </ul>
        </div>
      </section>

      {/* ✅ Dynamic Bottom Categories */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {bottomCats.map((cat) => (
            <div key={cat.title} className="flex flex-col h-full space-y-3 rounded-lg p-3">
              <Link href={cat.href} className="block">
                <SectionTitle>{cat.title}</SectionTitle>
              </Link>
              <ul className="divide-y divide-gray-400 flex-1">
                {cat.items[0] && (
                  <li className="pb-3">
                    <Link href={cat.items[0].href || "#"} className="block">
                      <Image
                        src={cat.items[0].image}
                        alt={cat.items[0].title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover rounded"
                      />
                      <h3 className="mt-2 font-semibold text-sm leading-snug">{cat.items[0].title}</h3>
                    </Link>
                  </li>
                )}
                {cat.items.slice(1).map((a) => (
                  <li key={a.id} className="py-2">
                    <TitleOnlyItem a={a} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
