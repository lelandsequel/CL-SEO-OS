import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
    title: {
        default: "IV One Health | Specialized Infusion Therapy in Riyadh",
        template: "%s | IV One Health",
    },
    description:
        "IV One Health provides physician-supervised infusion therapy services including IVIG, biologic, iron, and immunotherapy infusions in Riyadh, Saudi Arabia.",
    keywords: [
        "infusion therapy Riyadh",
        "IVIG infusion Saudi Arabia",
        "biologic infusion KSA",
        "iron infusion Riyadh",
        "immunotherapy Saudi Arabia",
    ],
    authors: [{ name: "IV One Health" }],
    creator: "IV One Health",
    publisher: "IV One Health",
    formatDetection: {
        email: false,
        telephone: true,
    },
    metadataBase: new URL("https://ivonehealth.com"),
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://ivonehealth.com",
        siteName: "IV One Health",
        title: "IV One Health | Specialized Infusion Therapy",
        description:
            "Physician-supervised infusion therapy services in Riyadh, Saudi Arabia.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <a href="#main-content" className="skip-link">
                    Skip to main content
                </a>
                <Header />
                <main id="main-content" className="main-content">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
