import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Privacy policy for IV One Health infusion therapy services.",
};

export default function PolicyPage() {
    return (
        <div className="container">
            <nav className="breadcrumbs">
                <a href="/">Home</a>
                <span>›</span>
                Privacy Policy
            </nav>

            <h1>Privacy Policy</h1>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-2xl)" }}>
                Last updated: January 2026
            </p>

            <section style={{ marginBottom: "var(--space-2xl)" }}>
                <h2>Introduction</h2>
                <p>
                    IV One Health (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting the privacy
                    of our patients and website visitors. This Privacy Policy explains how
                    we collect, use, disclose, and safeguard information when you visit
                    our website or receive services at our facility.
                </p>
            </section>

            <section style={{ marginBottom: "var(--space-2xl)" }}>
                <h2>Information We Collect</h2>
                <h3>Information from Referring Physicians</h3>
                <p>When your physician refers you to IV One Health, we receive:</p>
                <ul style={{ marginLeft: "var(--space-lg)", marginBottom: "var(--space-lg)" }}>
                    <li>Your name and contact information</li>
                    <li>Prescription and treatment details</li>
                    <li>Relevant medical history</li>
                    <li>Insurance information</li>
                </ul>

                <h3>Information from Patients</h3>
                <p>When you receive treatment, we may collect:</p>
                <ul style={{ marginLeft: "var(--space-lg)", marginBottom: "var(--space-lg)" }}>
                    <li>Identification documents</li>
                    <li>Treatment consent forms</li>
                    <li>Insurance authorization</li>
                    <li>Treatment records</li>
                </ul>

                <h3>Website Information</h3>
                <p>When you visit our website, we may automatically collect:</p>
                <ul style={{ marginLeft: "var(--space-lg)", marginBottom: "var(--space-lg)" }}>
                    <li>Browser type and version</li>
                    <li>Pages visited and time spent</li>
                    <li>Referring website</li>
                    <li>Device information</li>
                </ul>
            </section>

            <section style={{ marginBottom: "var(--space-2xl)" }}>
                <h2>How We Use Information</h2>
                <p>We use collected information to:</p>
                <ul style={{ marginLeft: "var(--space-lg)", marginBottom: "var(--space-lg)" }}>
                    <li>Provide infusion therapy services</li>
                    <li>Coordinate care with referring physicians</li>
                    <li>Process insurance claims</li>
                    <li>Improve our services</li>
                    <li>Comply with legal requirements</li>
                </ul>
            </section>

            <section style={{ marginBottom: "var(--space-2xl)" }}>
                <h2>Information Sharing</h2>
                <p>We may share information with:</p>
                <ul style={{ marginLeft: "var(--space-lg)", marginBottom: "var(--space-lg)" }}>
                    <li>Your referring physician (treatment updates)</li>
                    <li>Insurance providers (claims processing)</li>
                    <li>Regulatory authorities (as required by law)</li>
                </ul>
                <p>
                    We do not sell personal information to third parties.
                </p>
            </section>

            <section style={{ marginBottom: "var(--space-2xl)" }}>
                <h2>Data Security</h2>
                <p>
                    We implement appropriate technical and organizational measures to
                    protect personal information against unauthorized access, alteration,
                    disclosure, or destruction.
                </p>
            </section>

            <section style={{ marginBottom: "var(--space-2xl)" }}>
                <h2>Your Rights</h2>
                <p>You have the right to:</p>
                <ul style={{ marginLeft: "var(--space-lg)", marginBottom: "var(--space-lg)" }}>
                    <li>Access your personal information</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your information (where applicable)</li>
                    <li>Receive a copy of your treatment records</li>
                </ul>
            </section>

            <section style={{ marginBottom: "var(--space-2xl)" }}>
                <h2>Contact Us</h2>
                <p>
                    For questions about this Privacy Policy or to exercise your rights,
                    contact us at:
                </p>
                <p>
                    IV One Health
                    <br />
                    Riyadh, Saudi Arabia
                    <br />
                    <a href="/contact">Contact Page</a>
                </p>
            </section>

            <section>
                <h2>Regulatory Compliance</h2>
                <p>
                    IV One Health operates under the regulatory oversight of the Saudi
                    Ministry of Health and complies with applicable data protection
                    regulations in the Kingdom of Saudi Arabia.
                </p>
            </section>
        </div>
    );
}
