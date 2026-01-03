import { notFound } from "next/navigation";
import conditions from "@/data/conditions.json";

export async function generateStaticParams() {
    return conditions.map((condition) => ({
        slug: condition.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const condition = conditions.find((c) => c.slug === params.slug);
    if (!condition) return {};

    return {
        title: `${condition.name} | {{CLIENT_NAME}}`,
        description: condition.description,
    };
}

export default function ConditionPage({ params }: { params: { slug: string } }) {
    const condition = conditions.find((c) => c.slug === params.slug);

    if (!condition) {
        notFound();
    }

    return (
        <article>
            <h1>{condition.name}</h1>

            <aside className="disclaimer">
                <p>
                    <strong>Disclaimer:</strong> This information is for educational purposes only
                    and does not constitute medical advice. Consult your physician.
                </p>
            </aside>

            <section>
                <p>{condition.description}</p>
            </section>

            {/* Related services */}
            {condition.relatedServices && (
                <section>
                    <h2>Related Services</h2>
                    <ul>
                        {condition.relatedServices.map((serviceSlug: string) => (
                            <li key={serviceSlug}>
                                <a href={`/services/${serviceSlug}`}>{serviceSlug}</a>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "MedicalCondition",
                        "name": condition.name,
                        "description": condition.description
                    })
                }}
            />
        </article>
    );
}
