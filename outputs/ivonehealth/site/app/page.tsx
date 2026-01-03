import Link from "next/link";
import services from "@/data/services.json";
import conditions from "@/data/conditions.json";

export default function HomePage() {
    return (
        <>
            {/* Hero */}
            <section className="hero">
                <div className="container">
                    <h1>Specialized Infusion Therapy in Riyadh</h1>
                    <p>
                        IV One Health provides physician-supervised infusion services for
                        patients with autoimmune conditions, inflammatory diseases, and
                        oncology needs.
                    </p>
                    <Link href="/contact" className="btn btn-primary">
                        Contact Our Clinical Team
                    </Link>
                </div>
            </section>

            {/* Services */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">Our Services</h2>
                    <div className="card-grid">
                        {services.map((service) => (
                            <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                className="card"
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <h3>{service.name}</h3>
                                <p style={{ color: "var(--color-text-muted)" }}>
                                    {service.description}
                                </p>
                                <p style={{ marginTop: "auto", fontSize: "0.875rem" }}>
                                    Duration: {service.typicalDuration}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Conditions */}
            <section className="section section-alt">
                <div className="container">
                    <h2 className="section-title">Conditions We Treat</h2>
                    <div className="card-grid">
                        {conditions.map((condition) => (
                            <Link
                                key={condition.slug}
                                href={`/conditions-we-treat/${condition.slug}`}
                                className="card"
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <h3>{condition.name}</h3>
                                <p style={{ color: "var(--color-text-muted)" }}>
                                    {condition.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Us */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">Why IV One Health</h2>
                    <div className="card-grid">
                        <div className="card">
                            <h4>Specialized Focus</h4>
                            <p>
                                We focus exclusively on infusion therapy — it&apos;s all we do.
                            </p>
                        </div>
                        <div className="card">
                            <h4>Experienced Staff</h4>
                            <p>
                                Clinical team trained in complex infusion protocols and patient
                                care.
                            </p>
                        </div>
                        <div className="card">
                            <h4>Physician Coordination</h4>
                            <p>
                                Direct communication with referring providers throughout
                                treatment.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section section-alt">
                <div className="container" style={{ textAlign: "center" }}>
                    <h2>For Healthcare Providers</h2>
                    <p style={{ maxWidth: "600px", margin: "0 auto var(--space-lg)" }}>
                        IV One Health accepts referrals for patients requiring infusion
                        therapy services. We coordinate closely with referring physicians.
                    </p>
                    <Link href="/contact" className="btn btn-primary">
                        Contact Our Clinical Team
                    </Link>
                </div>
            </section>

            {/* Organization Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "MedicalBusiness",
                        name: "IV One Health",
                        url: "https://ivonehealth.com",
                        description:
                            "Specialized infusion therapy clinic providing IVIG, biologic, iron, and immunotherapy infusions in Riyadh, Saudi Arabia.",
                        address: {
                            "@type": "PostalAddress",
                            addressLocality: "Riyadh",
                            addressCountry: "SA",
                        },
                        medicalSpecialty: ["InfusionTherapy"],
                        isAcceptingNewPatients: true,
                    }),
                }}
            />
        </>
    );
}
