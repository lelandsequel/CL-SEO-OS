import { notFound } from "next/navigation";
import services from "@/data/services.json";

// Generate static paths from data
export async function generateStaticParams() {
    return services.map((service) => ({
        slug: service.slug,
    }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: { params: { slug: string } }) {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) return {};

    return {
        title: `${service.name} | {{CLIENT_NAME}}`,
        description: service.description,
    };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
    const service = services.find((s) => s.slug === params.slug);

    if (!service) {
        notFound();
    }

    return (
        <article>
            <h1>{service.name}</h1>

            {/* Medical disclaimer for YMYL sites */}
            <aside className="disclaimer">
                <p>
                    <strong>Disclaimer:</strong> This information is for educational purposes only.
                    Consult your physician for medical advice.
                </p>
            </aside>

            <section>
                <p>{service.description}</p>
            </section>

            {/* Render markdown content if available */}
            {/* <ServiceContent slug={params.slug} /> */}

            <section className="cta">
                <h2>Learn More</h2>
                <a href="/contact" className="btn-primary">
                    Contact Us
                </a>
            </section>

            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": service.name,
                        "description": service.description,
                        "provider": {
                            "@type": "Organization",
                            "name": "{{CLIENT_NAME}}"
                        }
                    })
                }}
            />
        </article>
    );
}
