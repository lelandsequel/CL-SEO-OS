import Link from "next/link";

export function Header() {
    return (
        <header className="header">
            <div className="container header-inner">
                <Link href="/" className="logo">
                    IV One Health
                </Link>

                <nav aria-label="Main navigation">
                    <ul className="nav-menu">
                        <li>
                            <Link href="/services/ivig-infusion">Services</Link>
                        </li>
                        <li>
                            <Link href="/conditions-we-treat/multiple-sclerosis">
                                Conditions
                            </Link>
                        </li>
                        <li>
                            <Link href="/guides/what-is-ivig-infusion-therapy">Guides</Link>
                        </li>
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                        <li>
                            <Link href="/contact" className="btn btn-primary">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
