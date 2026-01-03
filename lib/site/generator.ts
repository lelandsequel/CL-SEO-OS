/**
 * SEO OS++ Site Generator
 * 
 * Generates complete Next.js site structure with pSEO and AEO pages
 */

import * as fs from "fs";
import * as path from "path";
import { AnalysisResult } from "../analysis/types";

export interface SiteBuildResult {
    pagesGenerated: {
        core: number;
        services: number;
        conditions: number;
        guides: number;
        locations: number;
    };
    dataFiles: string[];
    contentFiles: string[];
    siteStructure: string[];
}

export interface SiteGeneratorConfig {
    businessName: string;
    description: string;
    currentUrl: string;
    specialRequests?: string;
    analysisResult?: AnalysisResult | null;
}

// ═══════════════════════════════════════════════════════════════
// BUSINESS-SPECIFIC DATA GENERATION
// ═══════════════════════════════════════════════════════════════

function extractServicesFromDescription(description: string, businessName: string): any[] {
    // Extract services based on business type
    const lowerDesc = description.toLowerCase();
    const lowerName = businessName.toLowerCase();
    
    // Financial advisory
    if (lowerDesc.includes("financial") || lowerDesc.includes("wealth") || lowerDesc.includes("advisor")) {
        return [
            {
                slug: "retirement-planning",
                name: "Retirement Planning",
                description: "Comprehensive retirement planning strategies tailored to your goals and timeline.",
                targetKeywords: ["retirement planning Houston", "retirement advisor", "401k planning"]
            },
            {
                slug: "investment-management",
                name: "Investment Management",
                description: "Personalized investment management services to grow and protect your wealth.",
                targetKeywords: ["investment advisor Houston", "portfolio management", "wealth management"]
            },
            {
                slug: "estate-planning",
                name: "Estate Planning",
                description: "Estate planning strategies to protect your legacy and minimize tax burden.",
                targetKeywords: ["estate planning Houston", "trust planning", "estate attorney"]
            },
            {
                slug: "tax-strategy",
                name: "Tax Strategy",
                description: "Tax-efficient strategies to maximize your after-tax returns.",
                targetKeywords: ["tax planning Houston", "tax advisor", "tax strategy"]
            }
        ];
    }
    
    // Medical/healthcare
    if (lowerDesc.includes("medical") || lowerDesc.includes("health") || lowerDesc.includes("treatment")) {
        return [
            {
                slug: "primary-care",
                name: "Primary Care",
                description: "Comprehensive primary care services for individuals and families.",
                targetKeywords: ["primary care Houston", "family doctor", "general practitioner"]
            },
            {
                slug: "specialty-care",
                name: "Specialty Care",
                description: "Specialized medical care for complex conditions.",
                targetKeywords: ["specialist Houston", "specialty care", "medical specialist"]
            }
        ];
    }
    
    // Default services
    return [
        {
            slug: "consultation",
            name: "Consultation",
            description: `Professional consultation services for ${businessName}.`,
            targetKeywords: [`${businessName} consultation`, "professional services"]
        }
    ];
}

function extractLocationsFromDescription(description: string): string[] {
    const lowerDesc = description.toLowerCase();
    const locations: string[] = [];
    
    // Houston area
    if (lowerDesc.includes("houston")) {
        locations.push("Houston", "The Woodlands", "Sugar Land", "Katy", "Spring", "Tomball", "Cypress", "Pearland");
    }
    
    // Default to Houston if no location specified
    if (locations.length === 0) {
        locations.push("Houston");
    }
    
    return locations;
}

function generateGuides(businessName: string, description: string, services: any[]): any[] {
    const guides: any[] = [];
    
    // Generate guides based on services
    services.forEach(service => {
        const guideSlug = `what-is-${service.slug.replace(/-/g, "-")}`;
        guides.push({
            slug: guideSlug,
            title: `What is ${service.name}?`,
            answer: `${service.name} is ${service.description.toLowerCase()}`,
            content: `# ${service.name}\n\n${service.description}\n\n## How It Works\n\n[Detailed explanation of ${service.name}]\n\n## Benefits\n\n- Benefit 1\n- Benefit 2\n- Benefit 3\n\n## FAQ\n\n### What should I expect?\n\n[Answer]\n\n### How long does it take?\n\n[Answer]`
        });
    });
    
    return guides;
}

// ═══════════════════════════════════════════════════════════════
// FILE GENERATORS
// ═══════════════════════════════════════════════════════════════

function generateDataFiles(outputDir: string, config: SiteGeneratorConfig): { services: any[], conditions: any[], guides: any[], locations: string[] } {
    const services = extractServicesFromDescription(config.description, config.businessName);
    const locations = extractLocationsFromDescription(config.description);
    const guides = generateGuides(config.businessName, config.description, services);
    
    // Write services.json
    fs.writeFileSync(
        path.join(outputDir, "data", "services.json"),
        JSON.stringify(services, null, 2)
    );
    
    // Write locations.json (if local business)
    if (locations.length > 0) {
        const locationsData = locations.map(loc => ({
            slug: loc.toLowerCase().replace(/\s+/g, "-"),
            name: loc,
            fullName: `${config.businessName} - ${loc}`,
            description: `${config.businessName} serving ${loc} and surrounding areas.`
        }));
        fs.writeFileSync(
            path.join(outputDir, "data", "locations.json"),
            JSON.stringify(locationsData, null, 2)
        );
    }
    
    // Write guides.json
    fs.writeFileSync(
        path.join(outputDir, "data", "guides.json"),
        JSON.stringify(guides, null, 2)
    );
    
    // Conditions only for medical businesses
    const conditions: any[] = [];
    if (config.description.toLowerCase().includes("medical") || 
        config.description.toLowerCase().includes("health") ||
        config.description.toLowerCase().includes("treatment")) {
        // Add sample conditions if medical
    }
    
    if (conditions.length > 0) {
        fs.writeFileSync(
            path.join(outputDir, "data", "conditions.json"),
            JSON.stringify(conditions, null, 2)
        );
    }
    
    return { services, conditions, guides, locations };
}

function generateNextJsSite(outputDir: string, config: SiteGeneratorConfig, data: { services: any[], conditions: any[], guides: any[], locations: string[] }): SiteBuildResult {
    const siteDir = path.join(outputDir, "site");
    const appDir = path.join(siteDir, "app");
    const componentsDir = path.join(siteDir, "components");
    const dataDir = path.join(siteDir, "data");
    
    // Ensure directories
    [siteDir, appDir, componentsDir, dataDir].forEach(dir => {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });
    
    // Copy data files to site/data
    fs.copyFileSync(
        path.join(outputDir, "data", "services.json"),
        path.join(dataDir, "services.json")
    );
    if (fs.existsSync(path.join(outputDir, "data", "locations.json"))) {
        fs.copyFileSync(
            path.join(outputDir, "data", "locations.json"),
            path.join(dataDir, "locations.json")
        );
    }
    fs.copyFileSync(
        path.join(outputDir, "data", "guides.json"),
        path.join(dataDir, "guides.json")
    );
    
    // Generate homepage
    const homepage = `import Link from "next/link";
import services from "@/data/services.json";
${data.guides.length > 0 ? 'import guides from "@/data/guides.json";' : ''}

export default function HomePage() {
    return (
        <>
            <section className="hero">
                <div className="container">
                    <h1>${config.businessName}</h1>
                    <p>${config.description}</p>
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
                                href={\`/services/\${service.slug}\`}
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
}`;
    
    fs.writeFileSync(path.join(appDir, "page.tsx"), homepage);
    
    // Generate layout
    const layout = `import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
    title: "${config.businessName}",
    description: "${config.description}",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}`;
    
    fs.writeFileSync(path.join(appDir, "layout.tsx"), layout);
    
    // Generate service pages
    const servicesDir = path.join(appDir, "services", "[slug]");
    if (!fs.existsSync(servicesDir)) fs.mkdirSync(servicesDir, { recursive: true });
    
    const servicePage = `import { notFound } from "next/navigation";
import services from "@/data/services.json";

export async function generateStaticParams() {
    return services.map((service) => ({
        slug: service.slug,
    }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
    const service = services.find((s) => s.slug === params.slug);
    
    if (!service) {
        notFound();
    }
    
    return (
        <div className="container">
            <h1>{service.name}</h1>
            <p>{service.description}</p>
        </div>
    );
}`;
    
    fs.writeFileSync(path.join(servicesDir, "page.tsx"), servicePage);
    
    // Generate guide pages
    if (data.guides.length > 0) {
        const guidesDir = path.join(appDir, "guides", "[slug]");
        if (!fs.existsSync(guidesDir)) fs.mkdirSync(guidesDir, { recursive: true });
        
        const guidePage = `import { notFound } from "next/navigation";
import guides from "@/data/guides.json";

export async function generateStaticParams() {
    return guides.map((guide) => ({
        slug: guide.slug,
    }));
}

export default function GuidePage({ params }: { params: { slug: string } }) {
    const guide = guides.find((g) => g.slug === params.slug);
    
    if (!guide) {
        notFound();
    }
    
    return (
        <div className="container">
            <h1>{guide.title}</h1>
            <p>{guide.answer}</p>
        </div>
    );
}`;
        
        fs.writeFileSync(path.join(guidesDir, "page.tsx"), guidePage);
    }
    
    // Generate core pages
    const aboutPage = `export default function AboutPage() {
    return (
        <div className="container">
            <h1>About ${config.businessName}</h1>
            <p>${config.description}</p>
        </div>
    );
}`;
    
    fs.mkdirSync(path.join(appDir, "about"), { recursive: true });
    fs.writeFileSync(path.join(appDir, "about", "page.tsx"), aboutPage);
    
    const contactPage = `export default function ContactPage() {
    return (
        <div className="container">
            <h1>Contact Us</h1>
            <p>Get in touch with ${config.businessName}</p>
        </div>
    );
}`;
    
    fs.mkdirSync(path.join(appDir, "contact"), { recursive: true });
    fs.writeFileSync(path.join(appDir, "contact", "page.tsx"), contactPage);
    
    // Generate components
    const header = `import Link from "next/link";

export default function Header() {
    return (
        <header>
            <nav>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
            </nav>
        </header>
    );
}`;
    
    fs.writeFileSync(path.join(componentsDir, "Header.tsx"), header);
    
    const footer = `export default function Footer() {
    return (
        <footer>
            <p>&copy; ${new Date().getFullYear()} ${config.businessName}</p>
        </footer>
    );
}`;
    
    fs.writeFileSync(path.join(componentsDir, "Footer.tsx"), footer);
    
    // Generate globals.css
    const globalsCss = `:root {
    --color-primary: #0066cc;
    --color-text: #333;
    --color-text-muted: #666;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: system-ui, -apple-system, sans-serif;
    line-height: 1.6;
    color: var(--color-text);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

.hero {
    padding: 4rem 0;
    text-align: center;
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.card {
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    border-radius: 4px;
}

.btn-primary {
    background: var(--color-primary);
    color: white;
}
`;
    
    fs.writeFileSync(path.join(appDir, "globals.css"), globalsCss);
    
    // Generate package.json and tsconfig
    const packageJson = {
        name: config.businessName.toLowerCase().replace(/\s+/g, "-"),
        version: "1.0.0",
        scripts: {
            dev: "next dev",
            build: "next build",
            start: "next start"
        },
        dependencies: {
            next: "14.0.0",
            react: "18.2.0",
            "react-dom": "18.2.0"
        }
    };
    
    fs.writeFileSync(
        path.join(siteDir, "package.json"),
        JSON.stringify(packageJson, null, 2)
    );
    
    const tsconfig = {
        compilerOptions: {
            target: "ES2020",
            lib: ["dom", "dom.iterable", "esnext"],
            allowJs: true,
            skipLibCheck: true,
            strict: true,
            forceConsistentCasingInFileNames: true,
            noEmit: true,
            esModuleInterop: true,
            module: "esnext",
            moduleResolution: "bundler",
            resolveJsonModule: true,
            isolatedModules: true,
            jsx: "preserve",
            incremental: true,
            plugins: [{ name: "next" }],
            paths: {
                "@/*": ["./*"]
            }
        },
        include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
        exclude: ["node_modules"]
    };
    
    fs.writeFileSync(
        path.join(siteDir, "tsconfig.json"),
        JSON.stringify(tsconfig, null, 2)
    );
    
    return {
        pagesGenerated: {
            core: 3, // homepage, about, contact
            services: data.services.length,
            conditions: data.conditions.length,
            guides: data.guides.length,
            locations: data.locations.length
        },
        dataFiles: ["services.json", "guides.json", ...(data.locations.length > 0 ? ["locations.json"] : [])],
        contentFiles: [],
        siteStructure: [
            "app/page.tsx",
            "app/layout.tsx",
            "app/about/page.tsx",
            "app/contact/page.tsx",
            "app/services/[slug]/page.tsx",
            ...(data.guides.length > 0 ? ["app/guides/[slug]/page.tsx"] : []),
            "components/Header.tsx",
            "components/Footer.tsx"
        ]
    };
}

// ═══════════════════════════════════════════════════════════════
// MAIN GENERATOR
// ═══════════════════════════════════════════════════════════════

export function generateSite(outputDir: string, config: SiteGeneratorConfig): SiteBuildResult {
    console.log("\n[Site Generator] Starting site build...");
    
    // Ensure data directory
    const dataDir = path.join(outputDir, "data");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    
    // Generate data files
    console.log("[Site Generator] Generating data files...");
    const data = generateDataFiles(outputDir, config);
    
    console.log(`[Site Generator] Generated ${data.services.length} services, ${data.guides.length} guides`);
    
    // Generate Next.js site
    console.log("[Site Generator] Generating Next.js site structure...");
    const result = generateNextJsSite(outputDir, config, data);
    
    console.log(`[Site Generator] Site build complete!`);
    console.log(`  - Core pages: ${result.pagesGenerated.core}`);
    console.log(`  - Service pages: ${result.pagesGenerated.services}`);
    console.log(`  - Guide pages: ${result.pagesGenerated.guides}`);
    
    return result;
}

