/**
 * SEO OS++ Phase 0 Analyzer
 * 
 * Analyzes crawled pages into Findings with evidence
 */

import {
    PageSnapshot,
    Finding,
    FindingCategory,
    FindingSeverity,
    SEOOSModule,
} from "./types";

// ═══════════════════════════════════════════════════════════════
// HELPER
// ═══════════════════════════════════════════════════════════════

let findingIdCounter = 0;

function createFinding(
    category: FindingCategory,
    severity: FindingSeverity,
    title: string,
    description: string,
    evidence: Array<{ url: string; snippet?: string; metric?: string }>,
    recommendation: string,
    seoOsModule: SEOOSModule,
    impactEstimate: string
): Finding {
    findingIdCounter++;
    return {
        id: `F${findingIdCounter.toString().padStart(3, "0")}`,
        category,
        severity,
        title,
        description,
        evidence,
        recommendation,
        seoOsModule,
        impactEstimate,
        pagesAffected: evidence.map((e) => e.url),
    };
}

// ═══════════════════════════════════════════════════════════════
// TECHNICAL CHECKS
// ═══════════════════════════════════════════════════════════════

function checkMissingTitles(pages: PageSnapshot[]): Finding | null {
    const affected = pages.filter((p) => !p.title || p.title.trim() === "");
    if (affected.length === 0) return null;

    return createFinding(
        "technical",
        affected.length > 3 ? "critical" : "high",
        "Missing Page Titles",
        `${affected.length} pages are missing the <title> tag, which is critical for search rankings.`,
        affected.slice(0, 5).map((p) => ({
            url: p.url,
            snippet: "No <title> tag found",
        })),
        "Add unique, descriptive titles to all pages (50-60 characters).",
        "Technical Optimizer",
        "High impact on CTR and rankings"
    );
}

function checkMissingMetaDescriptions(pages: PageSnapshot[]): Finding | null {
    const affected = pages.filter(
        (p) => !p.metaDescription || p.metaDescription.trim() === ""
    );
    if (affected.length === 0) return null;

    return createFinding(
        "technical",
        affected.length > 5 ? "high" : "medium",
        "Missing Meta Descriptions",
        `${affected.length} pages lack meta descriptions, reducing click-through rates from search results.`,
        affected.slice(0, 5).map((p) => ({
            url: p.url,
            snippet: "No meta description",
        })),
        "Add compelling meta descriptions (120-160 characters) that include target keywords.",
        "Technical Optimizer",
        "Moderate impact on CTR"
    );
}

function checkMissingCanonical(pages: PageSnapshot[]): Finding | null {
    const affected = pages.filter((p) => !p.canonical);
    if (affected.length === 0) return null;

    return createFinding(
        "technical",
        affected.length > 5 ? "medium" : "low",
        "Missing Canonical Tags",
        `${affected.length} pages lack canonical tags, risking duplicate content issues.`,
        affected.slice(0, 5).map((p) => ({
            url: p.url,
            snippet: "No canonical tag",
        })),
        "Add self-referencing canonical tags to all pages.",
        "Technical Optimizer",
        "Prevents duplicate content penalties"
    );
}

function checkNoindexPages(pages: PageSnapshot[]): Finding | null {
    const affected = pages.filter(
        (p) => p.robotsMeta && p.robotsMeta.toLowerCase().includes("noindex")
    );
    if (affected.length === 0) return null;

    return createFinding(
        "technical",
        "high",
        "Pages Blocked from Indexing",
        `${affected.length} pages have noindex directive, preventing them from appearing in search results.`,
        affected.slice(0, 5).map((p) => ({
            url: p.url,
            snippet: `robots: ${p.robotsMeta}`,
        })),
        "Review and remove noindex from pages that should be indexed.",
        "Technical Optimizer",
        "Critical if blocking important pages"
    );
}

function checkNon200Status(pages: PageSnapshot[]): Finding | null {
    const affected = pages.filter((p) => p.status !== 200 && p.status !== 0);
    if (affected.length === 0) return null;

    return createFinding(
        "technical",
        affected.some((p) => p.status >= 500) ? "critical" : "high",
        "Pages Returning Error Status",
        `${affected.length} pages are returning non-200 HTTP status codes.`,
        affected.slice(0, 5).map((p) => ({
            url: p.url,
            metric: `Status: ${p.status}`,
        })),
        "Fix server errors (5xx) immediately. Review 4xx errors for broken links.",
        "Technical Optimizer",
        "Severe impact on user experience and crawlability"
    );
}

function checkRedirectChains(pages: PageSnapshot[]): Finding | null {
    const affected = pages.filter((p) => p.url !== p.finalUrl);
    if (affected.length === 0) return null;

    return createFinding(
        "technical",
        affected.length > 5 ? "medium" : "low",
        "Redirect Chains Detected",
        `${affected.length} URLs redirect to different final URLs, potentially slowing crawling.`,
        affected.slice(0, 5).map((p) => ({
            url: p.url,
            snippet: `Redirects to: ${p.finalUrl}`,
        })),
        "Update internal links to point to final URLs. Consolidate redirect chains.",
        "Technical Optimizer",
        "Minor crawl efficiency impact"
    );
}

// ═══════════════════════════════════════════════════════════════
// ON-PAGE CHECKS
// ═══════════════════════════════════════════════════════════════

function checkMissingH1(pages: PageSnapshot[]): Finding | null {
    const affected = pages.filter((p) => !p.h1);
    if (affected.length === 0) return null;

    return createFinding(
        "onpage",
        affected.length > 3 ? "high" : "medium",
        "Missing H1 Headings",
        `${affected.length} pages lack an H1 heading, which defines the main topic for search engines.`,
        affected.slice(0, 5).map((p) => ({
            url: p.url,
            snippet: "No H1 tag found",
        })),
        "Add a single, descriptive H1 to each page that includes the primary keyword.",
        "Content Engine",
        "High impact on on-page SEO"
    );
}

function checkThinContent(pages: PageSnapshot[]): Finding | null {
    const affected = pages.filter((p) => p.wordCount < 250 && p.status === 200);
    if (affected.length === 0) return null;

    return createFinding(
        "onpage",
        affected.length > 5 ? "high" : "medium",
        "Thin Content Pages",
        `${affected.length} pages have fewer than 250 words, which may be considered thin content.`,
        affected.slice(0, 5).map((p) => ({
            url: p.url,
            metric: `${p.wordCount} words`,
        })),
        "Expand content on key pages to provide comprehensive coverage of the topic.",
        "Content Engine",
        "Impacts authority and rankings"
    );
}

function checkGenericTitles(pages: PageSnapshot[]): Finding | null {
    const genericPatterns = [
        /^home$/i,
        /^welcome$/i,
        /^untitled$/i,
        /^page$/i,
        /^index$/i,
    ];
    const affected = pages.filter(
        (p) => p.title && genericPatterns.some((pat) => pat.test(p.title!.trim()))
    );
    if (affected.length === 0) return null;

    return createFinding(
        "onpage",
        "medium",
        "Generic Page Titles",
        `${affected.length} pages have generic titles that don't describe their content.`,
        affected.slice(0, 5).map((p) => ({
            url: p.url,
            snippet: `Title: "${p.title}"`,
        })),
        "Replace generic titles with unique, keyword-rich titles that describe page content.",
        "Content Engine",
        "Moderate impact on CTR and relevance"
    );
}

function checkDuplicateMetaDescriptions(pages: PageSnapshot[]): Finding | null {
    const descriptionMap = new Map<string, PageSnapshot[]>();
    pages.forEach((p) => {
        if (p.metaDescription && p.metaDescription.trim()) {
            const key = p.metaDescription.toLowerCase().trim();
            if (!descriptionMap.has(key)) {
                descriptionMap.set(key, []);
            }
            descriptionMap.get(key)!.push(p);
        }
    });

    const duplicates = Array.from(descriptionMap.values()).filter(
        (group) => group.length > 1
    );
    if (duplicates.length === 0) return null;

    const affectedCount = duplicates.reduce((sum, g) => sum + g.length, 0);
    return createFinding(
        "onpage",
        affectedCount > 5 ? "medium" : "low",
        "Duplicate Meta Descriptions",
        `${affectedCount} pages share duplicate meta descriptions across ${duplicates.length} groups.`,
        duplicates
            .slice(0, 2)
            .flatMap((group) =>
                group.slice(0, 2).map((p) => ({
                    url: p.url,
                    snippet: p.metaDescription!.substring(0, 60) + "...",
                }))
            ),
        "Write unique meta descriptions for each page that accurately summarize the content.",
        "Content Engine",
        "Reduces differentiation in SERPs"
    );
}

function checkImagesMissingAlt(pages: PageSnapshot[]): Finding | null {
    const totalMissing = pages.reduce(
        (sum, p) => sum + p.imagesMissingAltCount,
        0
    );
    if (totalMissing === 0) return null;

    const affected = pages.filter((p) => p.imagesMissingAltCount > 0);
    return createFinding(
        "onpage",
        totalMissing > 20 ? "medium" : "low",
        "Images Missing Alt Text",
        `${totalMissing} images across ${affected.length} pages lack alt text, hurting accessibility and image SEO.`,
        affected.slice(0, 5).map((p) => ({
            url: p.url,
            metric: `${p.imagesMissingAltCount} images missing alt`,
        })),
        "Add descriptive alt text to all images that conveys their content or function.",
        "Content Engine",
        "Impacts accessibility and image search visibility"
    );
}

// ═══════════════════════════════════════════════════════════════
// LOCAL CHECKS
// ═══════════════════════════════════════════════════════════════

function checkMissingLocalSignals(pages: PageSnapshot[]): Finding | null {
    const hasPhone = pages.some((p) => p.hasPhone);
    const hasAddress = pages.some((p) => p.hasAddress);
    const hasCityState = pages.some((p) => p.hasCityState);

    const missing: string[] = [];
    if (!hasPhone) missing.push("phone number");
    if (!hasAddress) missing.push("street address");
    if (!hasCityState) missing.push("city/state");

    if (missing.length === 0) return null;

    return createFinding(
        "local",
        missing.length >= 2 ? "high" : "medium",
        "Missing Local Business Signals",
        `The site lacks visible ${missing.join(", ")} signals, hurting local search visibility.`,
        [
            {
                url: pages[0]?.url || "",
                snippet: `Missing: ${missing.join(", ")}`,
            },
        ],
        "Add NAP (Name, Address, Phone) prominently in footer and contact page.",
        "Local Pack Booster",
        "Critical for local pack rankings"
    );
}

function checkMissingLocalSchema(pages: PageSnapshot[]): Finding | null {
    const hasLocalSchema = pages.some((p) =>
        p.jsonldSnippets.some(
            (s: any) =>
                s["@type"] === "LocalBusiness" ||
                s["@type"] === "Organization" ||
                s["@type"] === "ProfessionalService"
        )
    );

    if (hasLocalSchema) return null;

    return createFinding(
        "local",
        "high",
        "Missing LocalBusiness Schema",
        "No LocalBusiness, Organization, or Service schema found on the site.",
        [
            {
                url: pages[0]?.url || "",
                snippet: "No LocalBusiness JSON-LD detected",
            },
        ],
        "Add LocalBusiness or Organization schema with complete NAP, hours, and service area.",
        "Schema Generator",
        "Essential for rich results and entity recognition"
    );
}

// ═══════════════════════════════════════════════════════════════
// AEO CHECKS
// ═══════════════════════════════════════════════════════════════

function checkMissingFAQSignals(pages: PageSnapshot[]): Finding | null {
    const hasFAQ = pages.some((p) => p.hasFAQSignals);
    const hasFAQSchema = pages.some((p) =>
        p.jsonldSnippets.some((s: any) => s["@type"] === "FAQPage")
    );

    if (hasFAQ && hasFAQSchema) return null;

    const issues: string[] = [];
    if (!hasFAQ) issues.push("no FAQ content sections");
    if (!hasFAQSchema) issues.push("no FAQPage schema");

    return createFinding(
        "aeo",
        "high",
        "Missing FAQ Content and Schema",
        `Site has ${issues.join(" and ")}, missing opportunities for featured snippets and AI answers.`,
        [
            {
                url: pages[0]?.url || "",
                snippet: issues.join("; "),
            },
        ],
        "Add FAQ sections to key pages with FAQPage schema markup.",
        "AEO Optimizer",
        "High impact on AI answer eligibility and voice search"
    );
}

function checkWeakEEATSignals(pages: PageSnapshot[]): Finding | null {
    const hasAuthor = pages.some((p) => p.hasAuthorSignals);
    const hasDisclosure = pages.some((p) => p.hasDisclosureSignals);

    const missing: string[] = [];
    if (!hasAuthor) missing.push("author/team credentials");
    if (!hasDisclosure) missing.push("disclosures/policies");

    if (missing.length === 0) return null;

    return createFinding(
        "aeo",
        missing.length >= 2 ? "high" : "medium",
        "Weak E-E-A-T Signals",
        `Site lacks ${missing.join(" and ")}, which are important for trust and YMYL topics.`,
        [
            {
                url: pages[0]?.url || "",
                snippet: `Missing: ${missing.join(", ")}`,
            },
        ],
        "Add team/advisor bios with credentials, and disclosure/privacy policy pages.",
        "AEO Optimizer",
        "Important for YMYL industries (finance, health, legal)"
    );
}

function checkMissingAnswerBlocks(pages: PageSnapshot[]): Finding | null {
    // Look for pages with h2s but short word counts between them (answer-first pattern)
    const pagesWithH2s = pages.filter((p) => p.h2s.length > 0);
    const hasAnswerPattern = pagesWithH2s.some(
        (p) => p.h2s.length >= 3 && p.wordCount > 500
    );

    if (hasAnswerPattern) return null;

    return createFinding(
        "aeo",
        "medium",
        "No Answer-First Content Structure",
        "Site lacks content structured for AI extraction (question headings with concise answers).",
        [
            {
                url: pages[0]?.url || "",
                snippet: "No answer-first content patterns detected",
            },
        ],
        "Create guide pages with clear Q&A format: question as H2, concise answer immediately after.",
        "AEO Optimizer",
        "Improves AI answer eligibility"
    );
}

// ═══════════════════════════════════════════════════════════════
// MAIN ANALYZER
// ═══════════════════════════════════════════════════════════════

export function analyzePages(pages: PageSnapshot[]): Finding[] {
    findingIdCounter = 0; // Reset counter

    const findings: Finding[] = [];

    // Technical checks
    const technicalChecks = [
        checkMissingTitles,
        checkMissingMetaDescriptions,
        checkMissingCanonical,
        checkNoindexPages,
        checkNon200Status,
        checkRedirectChains,
    ];

    // On-page checks
    const onpageChecks = [
        checkMissingH1,
        checkThinContent,
        checkGenericTitles,
        checkDuplicateMetaDescriptions,
        checkImagesMissingAlt,
    ];

    // Local checks
    const localChecks = [checkMissingLocalSignals, checkMissingLocalSchema];

    // AEO checks
    const aeoChecks = [
        checkMissingFAQSignals,
        checkWeakEEATSignals,
        checkMissingAnswerBlocks,
    ];

    const allChecks = [
        ...technicalChecks,
        ...onpageChecks,
        ...localChecks,
        ...aeoChecks,
    ];

    for (const check of allChecks) {
        const finding = check(pages);
        if (finding) {
            findings.push(finding);
        }
    }

    return findings;
}
