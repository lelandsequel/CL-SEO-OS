import { notFound } from "next/navigation";
import guides from "@/data/guides.json";

export async function generateStaticParams() {
    return guides.map((guide) => ({
        slug: guide.slug,
    }));
}

export default function GuidePage({ params }: { params: { slug: string } }) {
    const guide = guides.find((g) => g.slug === params.slug);
    
    if (!guide) {
        notFound();
    }
    
    return (
        <div className="container">
            <h1>{guide.title}</h1>
            <p>{guide.answer}</p>
        </div>
    );
}