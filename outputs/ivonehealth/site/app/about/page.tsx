import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn about IV One Health, a specialized infusion therapy center in Riyadh, Saudi Arabia.",
};

export default function AboutPage() {
    return (
        <div className="container">
            <nav className="breadcrumbs">
                <a href="/">Home</a>
                <span>›</span>
                About
            </nav>

            <h1>About IV One Health</h1>

            <div className="disclaimer">
                <p>
                    <strong>Note:</strong> IV One Health is a treatment administration
                    center. All treatments require a physician referral. We do not
                    provide diagnoses or prescriptions.
                </p>
            </div>

            <section style={{ marginBottom: "var(--space-2xl)" }}>
                <h2>Our Mission</h2>
                <p>
                    To provide exceptional infusion therapy services that support patients
                    and physicians in managing complex medical conditions.
                </p>
                <p>We believe in:</p>
                <ul style={{ marginLeft: "var(--space-lg)", marginBottom: "var(--space-lg)" }}>
                    <li>
                        <strong>Clinical Excellence</strong> — Rigorous protocols and
                        experienced staff
                    </li>
                    <li>
                        <strong>Patient Comfort</strong> — A healing environment designed
                        around patient needs
                    </li>
                    <li>
                        <strong>Physician Partnership</strong> — Seamless coordination with
                        referring providers
                    </li>
                </ul>
            </section>

            <section style={{ marginBottom: "var(--space-2xl)" }}>
                <h2>Our Clinical Team</h2>
                <p>IV One Health&apos;s clinical team includes:</p>
                <ul style={{ marginLeft: "var(--space-lg)", marginBottom: "var(--space-lg)" }}>
                    <li>
                        <strong>Registered Nurses</strong> — Specialized training in
                        infusion therapy
                    </li>
                    <li>
                        <strong>Clinical Coordinators</strong> — Managing scheduling and
                        physician communication
                    </li>
                    <li>
                        <strong>Medical Director Oversight</strong> — Ensuring protocols
                        meet highest standards
                    </li>
                </ul>
                <p>
                    Our staff maintains current certifications and undergoes regular
                    training.
                </p>
            </section>

            <section style={{ marginBottom: "var(--space-2xl)" }}>
                <h2>Our Facility</h2>
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Private Infusion Suites</td>
                                <td>Comfortable, individual treatment spaces</td>
                            </tr>
                            <tr>
                                <td>Medical Equipment</td>
                                <td>Modern infusion pumps and monitoring technology</td>
                            </tr>
                            <tr>
                                <td>Emergency Preparedness</td>
                                <td>Full resuscitation capabilities on-site</td>
                            </tr>
                            <tr>
                                <td>Amenities</td>
                                <td>WiFi, entertainment options, refreshments</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section style={{ marginBottom: "var(--space-2xl)" }}>
                <h2>Accreditation &amp; Compliance</h2>
                <p>
                    IV One Health operates under the regulatory oversight of the Saudi
                    Ministry of Health. Our facility maintains current MOH licensure,
                    medication handling compliance, infection control protocols, and
                    patient safety standards.
                </p>
            </section>

            <section
                style={{
                    background: "var(--color-bg-alt)",
                    padding: "var(--space-xl)",
                    borderRadius: "var(--radius-lg)",
                    textAlign: "center",
                }}
            >
                <h2>Partner With Us</h2>
                <p>
                    Healthcare providers seeking infusion services for their patients can
                    contact us to establish a referral relationship.
                </p>
                <a href="/contact" className="btn btn-primary">
                    Contact Our Clinical Team
                </a>
            </section>
        </div>
    );
}
