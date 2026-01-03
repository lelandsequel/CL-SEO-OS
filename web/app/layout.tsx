export const metadata = {
    title: "SEO OS++ Builder",
    description: "Generate SEO-optimized sites with audit, deck, and proposal",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, padding: 0 }}>
                {children}
            </body>
        </html>
    );
}

