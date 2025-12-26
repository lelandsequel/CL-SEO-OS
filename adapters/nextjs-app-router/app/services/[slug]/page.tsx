import services from "@/data/services.json";

export async function generateStaticParams() {
    return services.map(service => ({
        slug: service.slug
    }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
    const service = services.find(s => s.slug === params.slug);
    if (!service) return null;

    return (
        <main>
            <h1>{service.name}</h1>
            <p>{service.description}</p>
        </main>
    );
}
