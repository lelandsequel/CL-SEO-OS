import Link from "next/link";
import services from "@/data/services.json";
import guides from "@/data/guides.json";

export default function HomePage() {
    return (
        <>
            <section className="hero">
                <div className="container">
                    <h1>American Portfolio Financial Advisors – Houston</h1>
                    <p>Houston-based financial advisory/wealth management team.</p>
                    <Link href="/contact" className="btn btn-primary">
                        Contact Us
                    </Link>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h2 className="section-title">Our Services</h2>
                    <div className="card-grid">
                        {services.map((service) => (
                            <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                className="card"
                            >
                                <h3>{service.name}</h3>
                                <p>{service.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}