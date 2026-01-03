/**
 * SEO OS++ Phase 0 Audit Types
 */

// ═══════════════════════════════════════════════════════════════
// PAGE SNAPSHOT
// ═══════════════════════════════════════════════════════════════

export interface PageSnapshot {
    url: string;
    finalUrl: string;
    status: number;
    title: string | null;
    metaDescription: string | null;
    h1: string | null;
    h2s: string[];
    canonical: string | null;
    robotsMeta: string | null;
    ogTags: Record<string, string>;
    jsonldSnippets: object[];
    wordCount: number;
    internalLinksCount: number;
    externalLinksCount: number;
    imagesMissingAltCount: number;
    hasPhone: boolean;
    hasAddress: boolean;
    hasCityState: boolean;
    hasFAQSignals: boolean;
    hasAuthorSignals: boolean;
    hasDisclosureSignals: boolean;
    crawledAt: string;
    error?: string;
}

// ═══════════════════════════════════════════════════════════════
// FINDING
// ═══════════════════════════════════════════════════════════════

export type FindingCategory = "technical" | "onpage" | "local" | "aeo";
export type FindingSeverity = "critical" | "high" | "medium" | "low";
export type SEOOSModule =
    | "Technical Optimizer"
    | "Content Engine"
    | "Schema Generator"
    | "Local Pack Booster"
    | "AEO Optimizer"
    | "pSEO Program";

export interface FindingEvidence {
    url: string;
    snippet?: string;
    metric?: string;
}

export interface Finding {
    id: string;
    category: FindingCategory;
    severity: FindingSeverity;
    title: string;
    description: string;
    evidence: FindingEvidence[];
    recommendation: string;
    seoOsModule: SEOOSModule;
    impactEstimate: string;
    pagesAffected: string[];
}

// ═══════════════════════════════════════════════════════════════
// SCORES
// ═══════════════════════════════════════════════════════════════

export interface CategoryScores {
    technical: number;
    onpage: number;
    local: number;
    aeo: number;
}

export interface AuditScores {
    categories: CategoryScores;
    overall: number;
    weights: {
        technical: number;
        onpage: number;
        local: number;
        aeo: number;
    };
}

// ═══════════════════════════════════════════════════════════════
// AUDIT RESULT
// ═══════════════════════════════════════════════════════════════

export interface AuditResult {
    metadata: {
        targetUrl: string;
        businessName: string;
        description: string;
        auditedAt: string;
        crawlConfig: {
            maxDepth: number;
            maxPages: number;
        };
        crawlStatus: "complete" | "partial" | "failed";
        pagesAttempted: number;
        pagesCrawled: number;
    };
    pages: PageSnapshot[];
    findings: Finding[];
    scores: AuditScores;
    topBlockers: Finding[];
    topFixes: Finding[];
}

// ═══════════════════════════════════════════════════════════════
// AUDIT CONFIG
// ═══════════════════════════════════════════════════════════════

export interface AuditConfig {
    currentUrl: string;
    businessName: string;
    description: string;
    specialRequests?: string;
    toggles: {
        includeAudit: boolean;
        generateDeck: boolean;
        generateProposal: boolean;
    };
}

// Severity penalty values
export const SEVERITY_PENALTIES: Record<FindingSeverity, number> = {
    critical: 25,
    high: 15,
    medium: 8,
    low: 3,
};

// Score weights
export const SCORE_WEIGHTS: CategoryScores = {
    technical: 0.30,
    onpage: 0.30,
    local: 0.20,
    aeo: 0.20,
};
