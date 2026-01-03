import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import conditions from "@/data/conditions.json";
import services from "@/data/services.json";

// Generate static paths
export async function generateStaticParams() {
    return conditions.map((condition) => ({
        slug: condition.slug,
    }));
}

// Generate metadata
export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const condition = conditions.find((c) => c.slug === params.slug);
    if (!condition) return {};

    return {
        title: `${condition.name} Treatment in Riyadh`,
        description: condition.description,
        keywords: condition.targetKeywords,
    };
}

export default function ConditionPage({
    params,
}: {
    params: { slug: string };
}) {
    const condition = conditions.find((c) => c.slug === params.slug);

    if (!condition) {
        notFound();
    }

    // Get related services
    const relatedServices = services.filter((s) =>
        condition.relatedServices?.includes(s.slug)
    );

    return (
        <div className="container">
            <nav className="breadcrumbs">
                <a href="/">Home</a>
                <span>›</span>
                <a href="/conditions-we-treat/multiple-sclerosis">Conditions</a>
                <span>›</span>
                {condition.name}
            </nav>

            <h1>{condition.name} Treatment in Riyadh</h1>

            {/* YMYL Disclaimer */}
            <div className="disclaimer">
                <p>
                    <strong>Medical Disclaimer:</strong> This information is for
                    educational purposes only and does not constitute medical advice.
                    Consult your physician for diagnosis and treatment options.
                </p>
            </div>

            <section style={{ marginBottom: "var(--space-2xl)" }}>
                <h2>About {condition.name}</h2>
                <p style={{ fontSize: "var(--font-size-lg)" }}>
                    {condition.description}
                </p>
            </section>

            <section style={{ marginBottom: "var(--space-2xl)" }}>
                <h2>How Infusion Therapy Helps</h2>
                <p>{condition.infusionApproach}</p>
            </section>

            {/* Related Services — Internal Linking Hub */}
            {relatedServices.length > 0 && (
                <section style={{ marginBottom: "var(--space-2xl)" }}>
                    <h2>Available Infusion Therapies</h2>
                    <p>
                        IV One Health provides the following infusion services for patients
                        managing {condition.name}:
                    </p>
                    <div className="card-grid" style={{ gridTemplateColumns: "1fr" }}>
                        {relatedServices.map((service) => (
                            <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                className="card"
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <h4>{service.name}</h4>
                                <p style={{ color: "var(--color-text-muted)", margin: 0 }}>
                                    {service.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* What to Expect */}
            <section style={{ marginBottom: "var(--space-2xl)" }}>
                <h2>What to Expect at IV One Health</h2>
                <p>Our infusion center provides:</p>
                <ul style={{ marginLeft: "var(--space-lg)" }}>
                    <li>Comfortable, private treatment spaces</li>
                    <li>Experienced clinical staff</li>
                    <li>Coordination with your referring physician</li>
                    <li>Consistent scheduling to maintain treatment protocols</li>
                </ul>
            </section>

            {/* CTA */}
            <section
                style={{
                    background: "var(--color-bg-alt)",
                    padding: "var(--space-xl)",
                    borderRadius: "var(--radius-lg)",
                    textAlign: "center",
                }}
            >
                <h2>Physician Referral Required</h2>
                <p>
                    Treatment at IV One Health requires a referral from your physician.
                    Healthcare providers can contact us to arrange services.
                </p>
                <Link href="/contact" className="btn btn-primary">
                    Contact Our Clinical Team
                </Link>
            </section>

            {/* Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "MedicalCondition",
                        name: condition.fullName,
                        description: condition.description,
                        url: `https://ivonehealth.com/conditions-we-treat/${condition.slug}`,
                        possibleTreatment: relatedServices.map((s) => ({
                            "@type": "MedicalTherapy",
                            name: s.name,
                            url: `https://ivonehealth.com/services/${s.slug}`,
                        })),
                    }),
                }}
            />
        </div>
    );
}
