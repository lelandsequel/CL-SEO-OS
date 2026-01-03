import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Contact IV One Health for physician referrals and infusion therapy services in Riyadh, Saudi Arabia.",
};

export default function ContactPage() {
    return (
        <div className="container">
            <nav className="breadcrumbs">
                <a href="/">Home</a>
                <span>›</span>
                Contact
            </nav>

            <h1>Contact IV One Health</h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "var(--space-2xl)",
                }}
            >
                {/* For Physicians */}
                <section>
                    <h2>For Healthcare Providers</h2>
                    <p>
                        IV One Health accepts patient referrals from physicians throughout
                        Saudi Arabia.
                    </p>

                    <h3>Referral Process</h3>
                    <ol style={{ marginLeft: "var(--space-lg)", marginBottom: "var(--space-lg)" }}>
                        <li>Submit referral with prescription and patient information</li>
                        <li>We handle insurance verification and patient scheduling</li>
                        <li>Patient receives care per your protocol</li>
                        <li>You receive documentation after each treatment</li>
                    </ol>

                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Contact Method</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Phone</td>
                                    <td>+966 [Number to be added]</td>
                                </tr>
                                <tr>
                                    <td>Fax</td>
                                    <td>+966 [Fax to be added]</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>referrals@ivonehealth.com</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Location */}
                <section>
                    <h2>Location</h2>
                    <p>
                        <strong>IV One Health Clinic</strong>
                        <br />
                        Riyadh, Saudi Arabia
                    </p>
                    <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
                        Detailed address and map to be added.
                    </p>

                    <h3>Hours of Operation</h3>
                    <div className="table-wrapper">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Sunday – Thursday</td>
                                    <td>8:00 AM – 5:00 PM</td>
                                </tr>
                                <tr>
                                    <td>Friday – Saturday</td>
                                    <td>Closed</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* For Patients */}
                <section>
                    <h2>For Patients</h2>
                    <p>
                        If you have been referred to IV One Health by your physician, our
                        team will contact you to schedule your appointment.
                    </p>

                    <h3>What to Bring</h3>
                    <ul style={{ marginLeft: "var(--space-lg)", marginBottom: "var(--space-lg)" }}>
                        <li>Photo ID</li>
                        <li>Insurance card</li>
                        <li>Referral paperwork (if not already received)</li>
                        <li>List of current medications</li>
                        <li>Comfortable clothing</li>
                    </ul>
                </section>
            </div>

            <div className="disclaimer" style={{ marginTop: "var(--space-2xl)" }}>
                <p>
                    <strong>Note:</strong> IV One Health provides infusion therapy
                    services by physician referral only. We do not offer direct
                    consultations or diagnoses.
                </p>
            </div>

            {/* LocalBusiness Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "MedicalBusiness",
                        name: "IV One Health",
                        address: {
                            "@type": "PostalAddress",
                            addressLocality: "Riyadh",
                            addressCountry: "SA",
                        },
                        openingHoursSpecification: [
                            {
                                "@type": "OpeningHoursSpecification",
                                dayOfWeek: [
                                    "Sunday",
                                    "Monday",
                                    "Tuesday",
                                    "Wednesday",
                                    "Thursday",
                                ],
                                opens: "08:00",
                                closes: "17:00",
                            },
                        ],
                    }),
                }}
            />
        </div>
    );
}
