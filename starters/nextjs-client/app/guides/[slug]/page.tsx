import { notFound } from "next/navigation";
import guides from "@/data/guides.json";

export async function generateStaticParams() {
    return guides.map((guide) => ({
        slug: guide.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const guide = guides.find((g) => g.slug === params.slug);
    if (!guide) return {};

    return {
        title: guide.title,
        description: guide.summary,
    };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
    const guide = guides.find((g) => g.slug === params.slug);

    if (!guide) {
        notFound();
    }

    return (
        <article className="aeo-guide">
            <h1>{guide.title}</h1>

            {/* Direct answer block for AEO */}
            <div className="answer-block">
                <p>{guide.directAnswer}</p>
            </div>

            <aside className="note">
                <p>This guide is for educational purposes only.</p>
            </aside>

            {/* Render markdown content */}
            {/* <GuideContent slug={params.slug} /> */}

            {/* Soft CTA only — no sales language */}
            <section className="learn-more">
                <p>
                    Learn more about our{" "}
                    <a href={`/services/${guide.relatedService}`}>
                        {guide.relatedService} services
                    </a>.
                </p>
            </section>

            {/* FAQ Schema for AEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": guide.title,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": guide.directAnswer
                                }
                            }
                        ]
                    })
                }}
            />
        </article>
    );
}
