/**
 * SEO OS++ Phase 0 Current State Analysis Runner
 * 
 * Main entry point for Phase 0 current state analysis execution
 */

import { AnalysisConfig, AnalysisResult } from "./types";
import { crawlSite } from "./crawler";
import { analyzePages } from "./analyzer";
import { calculateScores, getTopBlockers, getTopFixes } from "./scorer";
import {
    generateAnalysisMarkdown,
    generateAnalysisSummary,
    generateAnalysisJson,
} from "./writer";

export interface AnalysisOutput {
    result: AnalysisResult;
    artifacts: {
        json: string;
        markdown: string;
        summary: string;
    };
}

export async function runPhase0Analysis(config: AnalysisConfig): Promise<AnalysisOutput> {
    console.log("\n========================================");
    console.log("PHASE 0: CURRENT STATE ANALYSIS — Starting");
    console.log("========================================\n");
    console.log(`Target: ${config.currentUrl}`);
    console.log(`Business: ${config.businessName}`);
    console.log("");

    // Step 1: Crawl
    console.log("[Phase 0] Step 1/4: Crawling site...");
    const crawlResult = await crawlSite(config.currentUrl);
    console.log(`[Phase 0] Crawled ${crawlResult.pagesCrawled} pages (status: ${crawlResult.crawlStatus})`);

    // Step 2: Analyze
    console.log("[Phase 0] Step 2/4: Analyzing pages...");
    const findings = analyzePages(crawlResult.pages);
    console.log(`[Phase 0] Found ${findings.length} issues`);

    // Step 3: Score
    console.log("[Phase 0] Step 3/4: Calculating scores...");
    const scores = calculateScores(findings);
    console.log(`[Phase 0] Overall score: ${scores.overall}/100`);

    // Step 4: Build result
    console.log("[Phase 0] Step 4/4: Generating artifacts...");
    const result: AnalysisResult = {
        metadata: {
            targetUrl: config.currentUrl,
            businessName: config.businessName,
            description: config.description,
            analyzedAt: new Date().toISOString(),
            crawlConfig: {
                maxDepth: 2,
                maxPages: 40,
            },
            crawlStatus: crawlResult.crawlStatus,
            pagesAttempted: crawlResult.pagesAttempted,
            pagesCrawled: crawlResult.pagesCrawled,
        },
        pages: crawlResult.pages,
        findings,
        scores,
        topBlockers: getTopBlockers(findings, 5),
        topFixes: getTopFixes(findings, 5),
    };

    // Generate artifacts
    const artifacts = {
        json: generateAnalysisJson(result),
        markdown: generateAnalysisMarkdown(result),
        summary: generateAnalysisSummary(result),
    };

    console.log("\n========================================");
    console.log("PHASE 0: CURRENT STATE ANALYSIS — Complete");
    console.log("========================================\n");

    return { result, artifacts };
}

// Backward compatibility exports
export const runPhase0Audit = runPhase0Analysis;
export type AuditOutput = AnalysisOutput;

// Export types for consumers
export * from "./types";
