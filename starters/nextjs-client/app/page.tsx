import services from "@/data/services.json";
import conditions from "@/data/conditions.json";

export default function HomePage() {
    return (
        <div>
            <section className="hero">
                <h1>{{ CLIENT_NAME }}</h1>
                <p>{{ TAGLINE }}</p>
            </section>

            <section className="services">
                <h2>Our Services</h2>
                <div className="service-grid">
                    {services.map((service) => (
                        <a key={service.slug} href={`/services/${service.slug}`}>
                            <h3>{service.name}</h3>
                            <p>{service.description}</p>
                        </a>
                    ))}
                </div>
            </section>

            {conditions.length > 0 && (
                <section className="conditions">
                    <h2>Conditions We Treat</h2>
                    <div className="condition-grid">
                        {conditions.map((condition) => (
                            <a key={condition.slug} href={`/conditions/${condition.slug}`}>
                                <h3>{condition.name}</h3>
                            </a>
                        ))}
                    </div>
                </section>
            )}

            <section className="cta">
                <h2>Get Started</h2>
                <a href="/contact" className="btn-primary">
                    Contact Us
                </a>
            </section>
        </div>
    );
}
