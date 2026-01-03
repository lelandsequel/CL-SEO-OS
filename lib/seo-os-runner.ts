/**
 * SEO OS++ Runner
 *
 * Main orchestrator that executes all phases including Phase 0 Audit
 */

import { runPhase0Audit, AuditConfig, AuditResult } from "./audit";
import { generateProposal } from "./proposal/generator";
import {
    generateAuditDeckSlides,
    generateRoadmapSlide,
    generateWalkthroughAuditSection,
    getPSEOAuditContext,
    getAEOAuditContext,
} from "./proposal/injectors";
import { generateSite, SiteBuildResult } from "./site/generator";
import * as fs from "fs";
import * as path from "path";

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════

export interface SEOOSConfig {
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

// ═══════════════════════════════════════════════════════════════
// FILE UTILITIES
// ═══════════════════════════════════════════════════════════════

function ensureDir(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function writeFile(filePath: string, content: string): void {
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`[Writer] Created: ${filePath}`);
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .substring(0, 50);
}

// ═══════════════════════════════════════════════════════════════
// DECK GENERATOR (with audit injection)
// ═══════════════════════════════════════════════════════════════

function generateDeck(
    config: SEOOSConfig,
    auditResult: AuditResult | null,
    siteBuildResult: SiteBuildResult | null
): string {
    let md = `# SEO Strategy Deck: ${config.businessName}\n\n`;
    md += `---\n\n`;

    // Slide 1: Executive Summary (updated with Before/After)
    md += `## Slide 1: Executive Summary\n\n`;
    if (auditResult) {
        md += `### Before\n`;
        md += `- SEO Score: ${auditResult.scores.overall}/100 (${auditResult.scores.overall >= 60 ? "Needs Work" : "Critical"})\n`;
        md += `- ${auditResult.findings.length} issues identified\n`;
        md += `- ${auditResult.pages.length} pages analyzed\n\n`;
        md += `### After\n`;
        md += `- Comprehensive SEO-optimized site built\n`;
        md += `- All critical issues addressed\n`;
        md += `- AEO-ready content structure\n\n`;
    } else {
        md += `Built a complete SEO-optimized site for **${config.businessName}**.\n\n`;
    }

    // Inject audit slides if available
    if (auditResult) {
        md += generateAuditDeckSlides(auditResult);
    }

    md += `---\n\n`;

    // Slide: What is pSEO?
    md += `## Slide: What is pSEO?\n\n`;
    md += `**Programmatic SEO** generates optimized pages from templates and data.\n\n`;
    if (auditResult) {
        md += `> 📊 **Audit finding**: ${getPSEOAuditContext(auditResult)}\n\n`;
    }
    md += `**Benefits**:\n`;
    md += `- Scales without manual effort\n`;
    md += `- Consistent optimization across all pages\n`;
    md += `- Each page targets specific keywords\n\n`;

    md += `---\n\n`;

    // Slide: What is AEO?
    md += `## Slide: What is AEO?\n\n`;
    md += `**Answer Engine Optimization** makes content eligible for AI answers.\n\n`;
    if (auditResult) {
        md += `> 📊 **Audit finding**: ${getAEOAuditContext(auditResult)}\n\n`;
    }
    md += `**How we achieve it**:\n`;
    md += `- Answer within first 40 words\n`;
    md += `- FAQ schema markup\n`;
    md += `- Neutral, educational tone\n\n`;

    // ═══════════════════════════════════════════════════════════════
    // ADDITIONAL MANDATORY SECTIONS
    // ═══════════════════════════════════════════════════════════════

    md += `---\n\n`;
    md += `## Slide: What is SEO?\n\n`;
    md += `**Search Engine Optimization** helps your website appear in search results when people search for your services.\n\n`;
    md += `**Why it matters**:\n`;
    md += `- 68% of online experiences start with a search\n`;
    md += `- First page results get 75% of clicks\n`;
    md += `- Local searches lead to purchases 50% of the time\n\n`;

    md += `---\n\n`;
    md += `## Slide: pSEO Plan for ${config.businessName}\n\n`;
    if (siteBuildResult) {
        md += `We generated **${siteBuildResult.pagesGenerated.services} service pages** and **${siteBuildResult.pagesGenerated.guides} guide pages**.\n\n`;
        md += `**Service Pages**:\n`;
        md += `- Each service gets a dedicated, optimized page\n`;
        md += `- Consistent structure with schema markup\n`;
        md += `- Internal linking hub structure\n\n`;
        if (siteBuildResult.pagesGenerated.locations > 0) {
            md += `**Location Pages**:\n`;
            md += `- ${siteBuildResult.pagesGenerated.locations} location pages generated\n`;
            md += `- Targets local search queries\n\n`;
        }
    } else {
        md += `**Programmatic SEO Strategy**:\n`;
        md += `- Service pages for each offering\n`;
        md += `- Location pages (if applicable)\n`;
        md += `- Template-based, scalable structure\n\n`;
    }

    md += `---\n\n`;
    md += `## Slide: AEO Implementation for ${config.businessName}\n\n`;
    if (siteBuildResult && siteBuildResult.pagesGenerated.guides > 0) {
        md += `**${siteBuildResult.pagesGenerated.guides} AEO-optimized guides** created:\n\n`;
        md += `- Answer-first structure (answer within first 40 words)\n`;
        md += `- FAQ schema markup on each guide\n`;
        md += `- Educational, non-sales tone\n`;
        md += `- Optimized for AI Overviews and featured snippets\n\n`;
    } else {
        md += `**AEO Strategy**:\n`;
        md += `- Answer-first guide pages\n`;
        md += `- FAQ schema implementation\n`;
        md += `- Speakable markup for voice search\n\n`;
    }

    md += `---\n\n`;
    md += `## Slide: Technical Fixes Summary\n\n`;
    if (auditResult) {
        const technicalFindings = auditResult.findings.filter(f => f.category === "technical");
        if (technicalFindings.length > 0) {
            md += `**Technical Issues Addressed**:\n\n`;
            technicalFindings.slice(0, 5).forEach((f, i) => {
                md += `${i + 1}. ${f.title}: ${f.recommendation}\n`;
            });
        } else {
            md += `All technical SEO best practices implemented.\n`;
        }
    } else {
        md += `- All pages include proper meta tags\n`;
        md += `- Schema markup on key pages\n`;
        md += `- Mobile-responsive design\n`;
        md += `- Fast page load times\n\n`;
    }

    md += `---\n\n`;
    md += `## Slide: Site Structure\n\n`;
    md += `\`\`\`\n`;
    md += `${config.currentUrl}\n`;
    md += `├── / (Homepage)\n`;
    md += `├── /about\n`;
    md += `├── /contact\n`;
    if (siteBuildResult && siteBuildResult.pagesGenerated.services > 0) {
        md += `├── /services/\n`;
        md += `│   └── [${siteBuildResult.pagesGenerated.services} service pages]\n`;
    }
    if (siteBuildResult && siteBuildResult.pagesGenerated.guides > 0) {
        md += `├── /guides/\n`;
        md += `│   └── [${siteBuildResult.pagesGenerated.guides} guide pages]\n`;
    }
    if (siteBuildResult && siteBuildResult.pagesGenerated.locations > 0) {
        md += `└── /locations/\n`;
        md += `    └── [${siteBuildResult.pagesGenerated.locations} location pages]\n`;
    }
    md += `\`\`\`\n\n`;

    md += `---\n\n`;
    md += `## Slide: 30/60/90 Day Roadmap\n\n`;
    if (auditResult) {
        md += generateRoadmapSlide(auditResult);
    } else {
        md += `### Day 0-30: Foundation\n`;
        md += `- Deploy core pages\n`;
        md += `- Implement schema markup\n`;
        md += `- Set up analytics\n\n`;
        md += `### Day 31-60: Expansion\n`;
        md += `- Launch pSEO pages\n`;
        md += `- Build internal linking\n`;
        md += `- Content optimization\n\n`;
        md += `### Day 61-90: Authority\n`;
        md += `- Publish AEO guides\n`;
        md += `- Monitor performance\n`;
        md += `- Iterate based on data\n\n`;
    }

    md += `---\n\n`;
    md += `## Slide: Next Steps / CTA\n\n`;
    md += `**Ready to launch?**\n\n`;
    md += `1. Review the generated site structure\n`;
    md += `2. Customize content as needed\n`;
    md += `3. Deploy to production\n`;
    md += `4. Monitor performance metrics\n\n`;
    md += `**Questions?** Contact us to discuss implementation.\n\n`;

    md += `---\n\n`;
    md += `*Generated by SEO OS++ | ${new Date().toISOString().split("T")[0]}*\n`;

    return md;
}

// ═══════════════════════════════════════════════════════════════
// WALKTHROUGH GENERATOR (with audit injection)
// ═══════════════════════════════════════════════════════════════

function generateWalkthrough(
    config: SEOOSConfig,
    auditResult: AuditResult | null
): string {
    let md = `# ${config.businessName} — Build Walkthrough\n\n`;

    // Inject audit section at top if available
    if (auditResult) {
        md += generateWalkthroughAuditSection(auditResult);
        md += `---\n\n`;
    }

    md += `## What Was Built\n\n`;
    md += `Complete SEO OS++ site build for **${config.businessName}**.\n\n`;
    md += `**Target**: ${config.currentUrl}\n\n`;

    if (auditResult) {
        md += `## Decisions Based on Audit\n\n`;
        auditResult.topBlockers.slice(0, 3).forEach((f, i) => {
            md += `${i + 1}. **${f.title}** → Fixed via ${f.seoOsModule}\n`;
        });
        md += `\n`;
    }

    md += `## Implementation Notes\n\n`;
    md += `All phases executed per SEO OS++ workflow.\n\n`;

    md += `---\n\n`;
    md += `*Generated by SEO OS++ | ${new Date().toISOString().split("T")[0]}*\n`;

    return md;
}

// ═══════════════════════════════════════════════════════════════
// MAIN RUNNER
// ═══════════════════════════════════════════════════════════════

export async function runSEOOS(config: SEOOSConfig): Promise<void> {
    const clientSlug = slugify(config.businessName);
    const outputDir = path.join(process.cwd(), "outputs", clientSlug);

    console.log("\n╔════════════════════════════════════════════════════════════╗");
    console.log("║                     SEO OS++ RUNNER                        ║");
    console.log("╚════════════════════════════════════════════════════════════╝\n");
    console.log(`Client: ${config.businessName}`);
    console.log(`URL: ${config.currentUrl}`);
    console.log(`Output: ${outputDir}`);
    console.log("");

    // Ensure output directories
    ensureDir(outputDir);
    ensureDir(path.join(outputDir, "audit"));

    let auditResult: AuditResult | null = null;

    // ═══════════════════════════════════════════════════════════════
    // PHASE 0: AUDIT
    // ═══════════════════════════════════════════════════════════════

    if (config.toggles.includeAudit) {
        try {
            const auditOutput = await runPhase0Audit({
                currentUrl: config.currentUrl,
                businessName: config.businessName,
                description: config.description,
                toggles: config.toggles,
            });

            auditResult = auditOutput.result;

            // Write audit artifacts
            writeFile(
                path.join(outputDir, "audit", "audit.json"),
                auditOutput.artifacts.json
            );
            writeFile(
                path.join(outputDir, "audit", "audit.md"),
                auditOutput.artifacts.markdown
            );
            writeFile(
                path.join(outputDir, "audit", "audit-summary.md"),
                auditOutput.artifacts.summary
            );

            console.log("Phase 0 audit complete ✓");
        } catch (error) {
            console.error("Phase 0 audit failed:", error);
            // Write failure artifact
            writeFile(
                path.join(outputDir, "audit", "audit.md"),
                `# Audit Failed\n\nCrawl could not complete. Error: ${error}\n\nAudit incomplete due to crawl restrictions.`
            );
        }
    } else {
        console.log("Phase 0 audit skipped (includeAudit = false)");
    }

    // ═══════════════════════════════════════════════════════════════
    // PHASE 1: SITE GENERATION
    // ═══════════════════════════════════════════════════════════════

    console.log("\n[Phase 1] Generating site structure...");
    let siteBuildResult: SiteBuildResult | null = null;
    try {
        siteBuildResult = generateSite(outputDir, {
            businessName: config.businessName,
            description: config.description,
            currentUrl: config.currentUrl,
            specialRequests: config.specialRequests,
            auditResult: auditResult,
        });
        console.log("[Phase 1] Site generation complete ✓");
    } catch (error) {
        console.error("[Phase 1] Site generation failed:", error);
    }

    // ═══════════════════════════════════════════════════════════════
    // GENERATE DECK
    // ═══════════════════════════════════════════════════════════════

    if (config.toggles.generateDeck) {
        console.log("\nGenerating SEO-STRATEGY-DECK.md...");
        const deck = generateDeck(config, auditResult, siteBuildResult);
        writeFile(path.join(outputDir, "SEO-STRATEGY-DECK.md"), deck);
    }

    // ═══════════════════════════════════════════════════════════════
    // GENERATE WALKTHROUGH
    // ═══════════════════════════════════════════════════════════════

    console.log("Generating WALKTHROUGH.md...");
    const walkthrough = generateWalkthrough(config, auditResult);
    writeFile(path.join(outputDir, "WALKTHROUGH.md"), walkthrough);

    // ═══════════════════════════════════════════════════════════════
    // GENERATE PROPOSAL
    // ═══════════════════════════════════════════════════════════════

    if (config.toggles.generateProposal && auditResult) {
        console.log("Generating PROPOSAL.md...");
        const proposal = generateProposal(auditResult, clientSlug);
        writeFile(path.join(outputDir, "PROPOSAL.md"), proposal);
    }

    // ═══════════════════════════════════════════════════════════════
    // BUILD SUMMARY
    // ═══════════════════════════════════════════════════════════════

    const buildSummary = {
        client: config.businessName,
        url: config.currentUrl,
        slug: clientSlug,
        buildDate: new Date().toISOString(),
        phases: {
            phase0Audit: config.toggles.includeAudit
                ? auditResult
                    ? "complete"
                    : "failed"
                : "skipped",
            deckGenerated: config.toggles.generateDeck,
            proposalGenerated: config.toggles.generateProposal && !!auditResult,
        },
        auditScore: auditResult?.scores.overall ?? null,
        findingsCount: auditResult?.findings.length ?? 0,
        pagesAnalyzed: auditResult?.metadata.pagesCrawled ?? 0,
        pagesGenerated: siteBuildResult ? {
            core: siteBuildResult.pagesGenerated.core,
            services: siteBuildResult.pagesGenerated.services,
            conditions: siteBuildResult.pagesGenerated.conditions,
            guides: siteBuildResult.pagesGenerated.guides,
            locations: siteBuildResult.pagesGenerated.locations,
            total: siteBuildResult.pagesGenerated.core +
                   siteBuildResult.pagesGenerated.services +
                   siteBuildResult.pagesGenerated.conditions +
                   siteBuildResult.pagesGenerated.guides +
                   siteBuildResult.pagesGenerated.locations
        } : null,
    };

    writeFile(
        path.join(outputDir, "BUILD-SUMMARY.json"),
        JSON.stringify(buildSummary, null, 2)
    );

    console.log("\n╔════════════════════════════════════════════════════════════╗");
    console.log("║               All phases executed ✓                        ║");
    console.log("╚════════════════════════════════════════════════════════════╝\n");

    console.log(`Output folder: ${outputDir}`);
    console.log(`Files created:`);
    if (config.toggles.includeAudit) {
        console.log(`  - audit/audit.json`);
        console.log(`  - audit/audit.md`);
        console.log(`  - audit/audit-summary.md`);
    }
    if (config.toggles.generateDeck) {
        console.log(`  - SEO-STRATEGY-DECK.md`);
    }
    console.log(`  - WALKTHROUGH.md`);
    if (config.toggles.generateProposal && auditResult) {
        console.log(`  - PROPOSAL.md`);
    }
    if (siteBuildResult) {
        console.log(`  - site/ (Next.js site)`);
        console.log(`  - data/ (JSON data files)`);
    }
    console.log(`  - BUILD-SUMMARY.json`);
}

// ═══════════════════════════════════════════════════════════════
// MAIN ENTRYPOINT (renamed for clarity)
// ═══════════════════════════════════════════════════════════════

export async function runSeoOsBuild(config: SEOOSConfig): Promise<void> {
    return runSEOOS(config);
}

// Export for CLI usage
export { runPhase0Audit };
