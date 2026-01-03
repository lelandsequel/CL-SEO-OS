/**
 * SEO OS++ Runner
 *
 * Main orchestrator that executes all phases including Phase 0 Current State Analysis
 */

import { runPhase0Analysis, AnalysisConfig, AnalysisResult } from "./analysis";
import { generateProposal } from "./proposal/generator";
import {
    generateAnalysisDeckSlides,
    generateRoadmapSlide,
    generateWalkthroughAnalysisSection,
    getPSEOAnalysisContext,
    getAEOAnalysisContext,
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
        includeAnalysis: boolean;
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
    analysisResult: AnalysisResult | null,
    siteBuildResult: SiteBuildResult | null
): string {
    let md = `# SEO Strategy Deck: ${config.businessName}\n\n`;
    md += `---\n\n`;

    // Slide 1: Executive Summary (updated with Before/After)
    md += `## Slide 1: Executive Summary\n\n`;
    if (analysisResult) {
        md += `### Before\n`;
        md += `- SEO Score: ${analysisResult.scores.overall}/100 (${analysisResult.scores.overall >= 60 ? "Needs Work" : "Critical"})\n`;
        md += `- ${analysisResult.findings.length} issues identified\n`;
        md += `- ${analysisResult.pages.length} pages analyzed\n\n`;
        md += `### After\n`;
        md += `- Comprehensive SEO-optimized site built\n`;
        md += `- All critical issues addressed\n`;
        md += `- AEO-ready content structure\n\n`;
    } else {
        md += `Built a complete SEO-optimized site for **${config.businessName}**.\n\n`;
    }

    // Inject analysis slides if available
    if (analysisResult) {
        md += generateAnalysisDeckSlides(analysisResult);
    }

    md += `---\n\n`;

    // Slide: What is pSEO?
    md += `## Slide: What is pSEO?\n\n`;
    md += `**Programmatic SEO** generates optimized pages from templates and data.\n\n`;
    if (analysisResult) {
        md += `> 📊 **Current state finding**: ${getPSEOAnalysisContext(analysisResult)}\n\n`;
    }
    md += `**Benefits**:\n`;
    md += `- Scales without manual effort\n`;
    md += `- Consistent optimization across all pages\n`;
    md += `- Each page targets specific keywords\n\n`;

    md += `---\n\n`;

    // Slide: What is AEO?
    md += `## Slide: What is AEO?\n\n`;
    md += `**Answer Engine Optimization** makes content eligible for AI answers.\n\n`;
    if (analysisResult) {
        md += `> 📊 **Current state finding**: ${getAEOAnalysisContext(analysisResult)}\n\n`;
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
    if (analysisResult) {
        const technicalFindings = analysisResult.findings.filter(f => f.category === "technical");
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
    if (analysisResult) {
        md += generateRoadmapSlide(analysisResult);
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
    analysisResult: AnalysisResult | null
): string {
    let md = `# ${config.businessName} — Build Walkthrough\n\n`;

    // Inject analysis section at top if available
    if (analysisResult) {
        md += generateWalkthroughAnalysisSection(analysisResult);
        md += `---\n\n`;
    }

    md += `## What Was Built\n\n`;
    md += `Complete SEO OS++ site build for **${config.businessName}**.\n\n`;
    md += `**Target**: ${config.currentUrl}\n\n`;

    if (analysisResult) {
        md += `## Decisions Based on Current State Analysis\n\n`;
        analysisResult.topBlockers.slice(0, 3).forEach((f, i) => {
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
    ensureDir(path.join(outputDir, "analysis"));

    let analysisResult: AnalysisResult | null = null;

    // ═══════════════════════════════════════════════════════════════
    // PHASE 0: CURRENT STATE ANALYSIS
    // ═══════════════════════════════════════════════════════════════

    if (config.toggles.includeAnalysis) {
        try {
            const analysisOutput = await runPhase0Analysis({
                currentUrl: config.currentUrl,
                businessName: config.businessName,
                description: config.description,
                toggles: config.toggles,
            });

            analysisResult = analysisOutput.result;

            // Write analysis artifacts
            const analysisDir = path.join(outputDir, "analysis");
            ensureDir(analysisDir);
            writeFile(
                path.join(analysisDir, "analysis.json"),
                analysisOutput.artifacts.json
            );
            writeFile(
                path.join(analysisDir, "analysis.md"),
                analysisOutput.artifacts.markdown
            );
            writeFile(
                path.join(analysisDir, "analysis-summary.md"),
                analysisOutput.artifacts.summary
            );

            console.log("Phase 0 current state analysis complete ✓");
        } catch (error) {
            console.error("Phase 0 current state analysis failed:", error);
            // Write failure artifact
            const analysisDir = path.join(outputDir, "analysis");
            ensureDir(analysisDir);
            writeFile(
                path.join(analysisDir, "analysis.md"),
                `# Current State Analysis Failed\n\nCrawl could not complete. Error: ${error}\n\nAnalysis incomplete due to crawl restrictions.`
            );
        }
    } else {
        console.log("Phase 0 current state analysis skipped (includeAnalysis = false)");
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
            analysisResult: analysisResult,
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
        const deck = generateDeck(config, analysisResult, siteBuildResult);
        writeFile(path.join(outputDir, "SEO-STRATEGY-DECK.md"), deck);
    }

    // ═══════════════════════════════════════════════════════════════
    // GENERATE WALKTHROUGH
    // ═══════════════════════════════════════════════════════════════

    console.log("Generating WALKTHROUGH.md...");
    const walkthrough = generateWalkthrough(config, analysisResult);
    writeFile(path.join(outputDir, "WALKTHROUGH.md"), walkthrough);

    // ═══════════════════════════════════════════════════════════════
    // GENERATE PROPOSAL
    // ═══════════════════════════════════════════════════════════════

    if (config.toggles.generateProposal && analysisResult) {
        console.log("Generating PROPOSAL.md...");
        const proposal = generateProposal(analysisResult, clientSlug);
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
            phase0Analysis: config.toggles.includeAnalysis
                ? analysisResult
                    ? "complete"
                    : "failed"
                : "skipped",
            deckGenerated: config.toggles.generateDeck,
            proposalGenerated: config.toggles.generateProposal && !!analysisResult,
        },
        analysisScore: analysisResult?.scores.overall ?? null,
        findingsCount: analysisResult?.findings.length ?? 0,
        pagesAnalyzed: analysisResult?.metadata.pagesCrawled ?? 0,
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
    if (config.toggles.includeAnalysis) {
        console.log(`  - analysis/analysis.json`);
        console.log(`  - analysis/analysis.md`);
        console.log(`  - analysis/analysis-summary.md`);
    }
    if (config.toggles.generateDeck) {
        console.log(`  - SEO-STRATEGY-DECK.md`);
    }
    console.log(`  - WALKTHROUGH.md`);
    if (config.toggles.generateProposal && analysisResult) {
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
export { runPhase0Analysis };
