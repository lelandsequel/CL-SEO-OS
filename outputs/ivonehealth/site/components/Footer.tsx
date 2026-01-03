import Link from "next/link";

export function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-col">
                        <h4>IV One Health</h4>
                        <p>Specialized infusion therapy services in Riyadh, Saudi Arabia.</p>
                        <p style={{ marginTop: "1rem", fontSize: "0.875rem" }}>
                            All treatments require physician referral.
                        </p>
                    </div>

                    <div className="footer-col">
                        <h4>Services</h4>
                        <ul>
                            <li>
                                <Link href="/services/ivig-infusion">IVIG Infusion</Link>
                            </li>
                            <li>
                                <Link href="/services/biologic-infusions">
                                    Biologic Infusions
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/iron-infusion">Iron Infusion</Link>
                            </li>
                            <li>
                                <Link href="/services/immunotherapy">Immunotherapy</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Conditions</h4>
                        <ul>
                            <li>
                                <Link href="/conditions-we-treat/multiple-sclerosis">
                                    Multiple Sclerosis
                                </Link>
                            </li>
                            <li>
                                <Link href="/conditions-we-treat/crohns-disease">
                                    Crohn&apos;s Disease
                                </Link>
                            </li>
                            <li>
                                <Link href="/conditions-we-treat/rheumatoid-arthritis">
                                    Rheumatoid Arthritis
                                </Link>
                            </li>
                            <li>
                                <Link href="/conditions-we-treat/oncology">
                                    Oncology Support
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Contact</h4>
                        <ul>
                            <li>Riyadh, Saudi Arabia</li>
                            <li>
                                <Link href="/contact">Contact Us</Link>
                            </li>
                            <li>
                                <Link href="/about">About</Link>
                            </li>
                            <li>
                                <Link href="/policy">Privacy Policy</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        © {new Date().getFullYear()} IV One Health. All rights reserved.
                    </p>
                    <p style={{ marginTop: "0.5rem" }}>
                        All treatments administered under physician supervision. This site
                        is for informational purposes only.
                    </p>
                </div>
            </div>
        </footer>
    );
}
