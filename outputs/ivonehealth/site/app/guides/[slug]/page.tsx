import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import guides from "@/data/guides.json";
import services from "@/data/services.json";
import conditions from "@/data/conditions.json";

// Generate static paths
export async function generateStaticParams() {
    return guides.map((guide) => ({
        slug: guide.slug,
    }));
}

// Generate metadata
export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const guide = guides.find((g) => g.slug === params.slug);
    if (!guide) return {};

    return {
        title: guide.title,
        description: guide.directAnswer,
    };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
    const guide = guides.find((g) => g.slug === params.slug);

    if (!guide) {
        notFound();
    }

    // Get related content
    const relatedService = services.find(
        (s) => s.slug === (guide as any).relatedService
    );
    const relatedCondition = conditions.find(
        (c) => c.slug === (guide as any).relatedCondition
    );

    return (
        <div className="container">
            <nav className="breadcrumbs">
                <a href="/">Home</a>
                <span>›</span>
                <a href="/guides/what-is-ivig-infusion-therapy">Guides</a>
                <span>›</span>
                {guide.title}
            </nav>

            <article>
                <h1>{guide.title}</h1>

                {/* AEO Answer Block — First 40 words for AI extraction */}
                <div className="answer-block">
                    <p>{guide.directAnswer}</p>
                </div>

                {/* Educational note — No sales language */}
                <aside
                    style={{
                        fontSize: "var(--font-size-sm)",
                        color: "var(--color-text-muted)",
                        marginBottom: "var(--space-xl)",
                    }}
                >
                    <p>
                        This guide is for educational purposes only. Consult your physician
                        for medical advice.
                    </p>
                </aside>

                {/* Extended content placeholder */}
                <section style={{ marginBottom: "var(--space-2xl)" }}>
                    <h2>Understanding the Details</h2>
                    <p>
                        The information provided here offers a general overview. Treatment
                        decisions should always be made in consultation with a qualified
                        healthcare provider who can assess individual circumstances.
                    </p>
                </section>

                {/* Related content — Soft internal linking */}
                <section
                    style={{
                        background: "var(--color-bg-alt)",
                        padding: "var(--space-lg)",
                        borderRadius: "var(--radius-lg)",
                        marginBottom: "var(--space-2xl)",
                    }}
                >
                    <h2>Learn More</h2>
                    {relatedService && (
                        <p>
                            Learn more about{" "}
                            <Link href={`/services/${relatedService.slug}`}>
                                {relatedService.name}
                            </Link>{" "}
                            at IV One Health.
                        </p>
                    )}
                    {relatedCondition && (
                        <p>
                            Read about{" "}
                            <Link href={`/conditions-we-treat/${relatedCondition.slug}`}>
                                {relatedCondition.name} treatment
                            </Link>{" "}
                            at IV One Health.
                        </p>
                    )}
                </section>

                {/* FAQ Schema for AEO */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            mainEntity: [
                                {
                                    "@type": "Question",
                                    name: guide.title,
                                    acceptedAnswer: {
                                        "@type": "Answer",
                                        text: guide.directAnswer,
                                    },
                                },
                            ],
                        }),
                    }}
                />

                {/* Speakable schema for voice search */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebPage",
                            name: guide.title,
                            speakable: {
                                "@type": "SpeakableSpecification",
                                cssSelector: [".answer-block"],
                            },
                        }),
                    }}
                />
            </article>
        </div>
    );
}
