import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import services from "@/data/services.json";
import conditions from "@/data/conditions.json";

// Generate static paths
export async function generateStaticParams() {
    return services.map((service) => ({
        slug: service.slug,
    }));
}

// Generate metadata
export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) return {};

    return {
        title: `${service.name} in Riyadh`,
        description: service.description,
        keywords: service.targetKeywords,
    };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
    const service = services.find((s) => s.slug === params.slug);

    if (!service) {
        notFound();
    }

    // Get related conditions
    const relatedConditions = conditions.filter((c) =>
        service.relatedConditions?.includes(c.slug)
    );

    return (
        <div className="container">
            <nav className="breadcrumbs">
                <a href="/">Home</a>
                <span>›</span>
                <a href="/services/ivig-infusion">Services</a>
                <span>›</span>
                {service.name}
            </nav>

            <h1>{service.name} in Riyadh</h1>

            {/* YMYL Disclaimer */}
            <div className="disclaimer">
                <p>
                    <strong>Medical Disclaimer:</strong> This information is for
                    educational purposes only. All treatments at IV One Health are
                    administered under physician supervision and require a medical
                    referral.
                </p>
            </div>

            <section style={{ marginBottom: "var(--space-2xl)" }}>
                <h2>About {service.name}</h2>
                <p style={{ fontSize: "var(--font-size-lg)" }}>{service.description}</p>
            </section>

            <section style={{ marginBottom: "var(--space-2xl)" }}>
                <h2>What to Expect</h2>
                <div className="table-wrapper">
                    <table>
                        <tbody>
                            <tr>
                                <th>Typical Duration</th>
                                <td>{service.typicalDuration}</td>
                            </tr>
                            <tr>
                                <th>Frequency</th>
                                <td>{service.frequency}</td>
                            </tr>
                            <tr>
                                <th>Setting</th>
                                <td>Private infusion suite with clinical supervision</td>
                            </tr>
                            <tr>
                                <th>Monitoring</th>
                                <td>Vital signs monitored throughout treatment</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Related Conditions — Internal Linking Hub */}
            {relatedConditions.length > 0 && (
                <section style={{ marginBottom: "var(--space-2xl)" }}>
                    <h2>Conditions Treated</h2>
                    <p>
                        {service.name} may be used to help manage the following conditions:
                    </p>
                    <div
                        className="card-grid"
                        style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
                    >
                        {relatedConditions.map((condition) => (
                            <Link
                                key={condition.slug}
                                href={`/conditions-we-treat/${condition.slug}`}
                                className="card"
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <h4>{condition.name}</h4>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* CTA */}
            <section
                style={{
                    background: "var(--color-bg-alt)",
                    padding: "var(--space-xl)",
                    borderRadius: "var(--radius-lg)",
                    textAlign: "center",
                }}
            >
                <h2>Physician Referral</h2>
                <p>
                    {service.name} at IV One Health requires a physician referral.
                    Healthcare providers can contact our clinical team to arrange services
                    for their patients.
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
                        "@type": "MedicalTherapy",
                        name: service.fullName,
                        description: service.description,
                        url: `https://ivonehealth.com/services/${service.slug}`,
                        medicineSystem: "WesternConventional",
                        provider: {
                            "@type": "MedicalBusiness",
                            name: "IV One Health",
                            url: "https://ivonehealth.com",
                        },
                    }),
                }}
            />
        </div>
    );
}
