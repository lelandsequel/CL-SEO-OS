const guides = [
    {
        slug: "how-much-does-roof-repair-cost",
        title: "How Much Does Roof Repair Cost?",
        answer: "Roof repair costs vary based on damage, materials, and location."
    }
];

export async function generateStaticParams() {
    return guides.map(guide => ({
        slug: guide.slug
    }));
}

export default function GuidePage({ params }: { params: { slug: string } }) {
    const guide = guides.find(g => g.slug === params.slug);
    if (!guide) return null;

    return (
        <main>
            <h1>{guide.title}</h1>
            <p>{guide.answer}</p>
        </main>
    );
}
