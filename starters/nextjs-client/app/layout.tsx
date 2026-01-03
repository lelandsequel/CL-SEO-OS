import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "{{CLIENT_NAME}}",
    description: "{{CLIENT_DESCRIPTION}}",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <header>
                    {/* Navigation component goes here */}
                </header>
                <main>{children}</main>
                <footer>
                    {/* Footer with location, contact, legal */}
                </footer>
            </body>
        </html>
    );
}
