import Image from "next/image";
import Link from "next/link";
import { fetchLatestArticles, fetchArticlesByCategory } from "@/lib/contentful";

type Article = {
  id: string;
  title: string;
  description?: string;
  image: string;
  href?: string;
};

function ListItem({ a }: { a: Article }) {
  return (
    <li className="py-3">
      <Link href={a.href || "#"} className="flex gap-3 items-start">
        <Image
          src={a.image || "https://placehold.co/120x80/png"}
          alt={a.title}
          width={120}
          height={80}
          className="rounded object-cover w-[120px] h-[80px] flex-shrink-0"
        />
        <div>
          <h3 className="font-semibold leading-snug">{a.title}</h3>
          {a.description ? (
            <p className="text-sm text-black/70 mt-1 line-clamp-3">
              {a.description}
            </p>
          ) : null}
        </div>
      </Link>
    </li>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-bold text-lg border-l-4 pl-2 border-black">{children}</h2>
  );
}

export default async function Home() {
  const adTop = "https://placehold.co/970x90/png?text=Top+Ad+Banner";
  const adSide = "https://placehold.co/300x250/png?text=Ad";

  const mapEntry = (e: any): Article => {
    const rawUrl = e.fields.image?.fields?.file?.url;
    const normalizedUrl = rawUrl
      ? rawUrl.startsWith("//")
        ? `https:${rawUrl}`
        : rawUrl
      : "https://placehold.co/400x300/png";
    return {
      id: e.sys.id,
      title: e.fields.title,
      description: e.fields.description,
      image: normalizedUrl,
      href: e.fields.slug ? `/article/${e.fields.slug}` : undefined,
    };
  };

  const [latest, pol, spo, ent, tech] = await Promise.all([
    fetchLatestArticles(20),
    fetchArticlesByCategory("politics", 6),
    fetchArticlesByCategory("sports", 6),
    fetchArticlesByCategory("entertainment", 6),
    fetchArticlesByCategory("technology", 6),
  ]);

  const latestMapped = latest.map(mapEntry);
  const lead: Article | undefined = latestMapped[0];
  const leftList: Article[] = latestMapped.slice(1, 5);
  const topStories: Article[] = latestMapped.slice(5, 9);
  const editorsPicks: Article[] = latestMapped.slice(9, 15);

  const mustRead: Article | undefined = latestMapped[5];
  const shows: Article | undefined = latestMapped[6];
  const videoMain: Article | undefined = latestMapped[7];
  const videoList: Article[] = latestMapped.slice(8, 12);
  const headlines: Article[] = latestMapped.slice(12, 18);

  const bottomCats: { title: string; href: string; items: Article[] }[] = [
    { title: "Politics", href: "/politics", items: pol.map(mapEntry).slice(0, 4) },
    { title: "Sports", href: "/sports", items: spo.map(mapEntry).slice(0, 4) },
    { title: "Entertainment", href: "/entertainment", items: ent.map(mapEntry).slice(0, 4) },
    { title: "Technology", href: "/technology", items: tech.map(mapEntry).slice(0, 4) },
  ];

  return (
    <div className="space-y-8">
      {/* Top banner */}
      <div className="w-full flex justify-center">
        <Image src={adTop} alt="Ad banner" width={970} height={90} />
      </div>

      {/* Three-column hero area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left lead and list */}
        <section className="space-y-4">
          {lead && (
            <Link href={lead.href || "#"} className="block">
              <Image
                src={lead.image}
                alt={lead.title}
                width={800}
                height={450}
                className="w-full h-auto rounded"
              />
              <h1 className="mt-3 text-xl font-bold leading-snug">{lead.title}</h1>
              <p className="text-sm text-black/70 mt-1">{lead.description}</p>
            </Link>
          )}

          <ul className="divide-y divide-black/[.08]">
            {leftList.map((a) => (
              <ListItem key={a.id} a={a} />
            ))}
          </ul>
        </section>

        {/* Middle: Top Stories grid */}
        <section>
          <SectionTitle>Top Stories</SectionTitle>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topStories.map((a) => (
              <Link key={a.id} href={a.href || "#"} className="block">
                <Image
                  src={a.image}
                  alt={a.title}
                  width={480}
                  height={320}
                  className="w-full h-auto rounded"
                />
                <h3 className="mt-2 font-semibold leading-snug">{a.title}</h3>
                {a.description && (
                  <p className="text-sm text-black/70 mt-1 line-clamp-2">
                    {a.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>

        {/* Right sidebar */}
        <aside className="space-y-4">
          <div className="w-full flex justify-center">
            <Image src={adSide} alt="Sidebar ad" width={300} height={250} />
          </div>
          <div>
            <SectionTitle>Editor's Picks</SectionTitle>
            <ul className="mt-3 divide-y divide-black/[.08]">
              {editorsPicks.map((a) => (
                <ListItem key={a.id} a={a} />
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Must Read */}
      <section className="space-y-3">
        <SectionTitle>Must Read</SectionTitle>
        {mustRead && (
          <Link href={mustRead.href || "#"} className="block">
            <Image
              src={mustRead.image}
              alt={mustRead.title}
              width={1000}
              height={400}
              className="w-full h-auto rounded"
            />
            <h3 className="mt-2 font-semibold">{mustRead.title}</h3>
          </Link>
        )}
      </section>

      {/* Shows */}
      <section className="space-y-3">
        <SectionTitle>Shows</SectionTitle>
        {shows && (
          <Link href={shows.href || "#"} className="block">
            <Image
              src={shows.image}
              alt={shows.title}
              width={1000}
              height={360}
              className="w-full h-auto rounded"
            />
          </Link>
        )}
      </section>

      {/* Videos + Headlines */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SectionTitle>Videos</SectionTitle>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            {videoMain && (
              <Link href={videoMain.href || "#"} className="md:col-span-2 block">
                <Image
                  src={videoMain.image}
                  alt={videoMain.title}
                  width={900}
                  height={500}
                  className="w-full h-auto rounded"
                />
                <h3 className="mt-2 font-semibold text-lg leading-snug">
                  {videoMain.title}
                </h3>
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

      {/* Bottom categories */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {bottomCats.map((cat) => (
            <div key={cat.title} className="space-y-3">
              <Link href={cat.href} className="block">
                <SectionTitle>{cat.title}</SectionTitle>
              </Link>
              <ul className="divide-y divide-black/[.08]">
                {cat.items.map((a) => (
                  <ListItem key={a.id} a={a} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
