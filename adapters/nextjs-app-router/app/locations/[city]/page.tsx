import locations from "@/data/locations.json";

export async function generateStaticParams() {
    return locations.map(loc => ({
        city: loc.city
    }));
}

export default function LocationPage({ params }: { params: { city: string } }) {
    const location = locations.find(l => l.city === params.city);
    if (!location) return null;

    return (
        <main>
            <h1>Service Area: {location.name}</h1>
        </main>
    );
}
