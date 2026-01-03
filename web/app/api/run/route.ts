/**
 * SEO OS++ API Route
 * 
 * POST /api/run
 * Body: { currentUrl, businessName, description, specialRequests?, toggles }
 */

import { NextRequest, NextResponse } from "next/server";
import * as path from "path";

// Import from parent directory (project root)
const projectRoot = path.resolve(process.cwd(), "..");
const libPath = path.join(projectRoot, "lib", "seo-os-runner");
const { runSeoOsBuild, SEOOSConfig } = require(libPath);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        const config: SEOOSConfig = {
            currentUrl: body.currentUrl,
            businessName: body.businessName,
            description: body.description,
            specialRequests: body.specialRequests,
            toggles: {
                includeAnalysis: body.toggles?.includeAnalysis ?? body.toggles?.includeAudit ?? true,
                generateDeck: body.toggles?.generateDeck ?? true,
                generateProposal: body.toggles?.generateProposal ?? true,
            },
        };
        
        // Validate required fields
        if (!config.currentUrl || !config.businessName || !config.description) {
            return NextResponse.json(
                { error: "Missing required fields: currentUrl, businessName, description" },
                { status: 400 }
            );
        }
        
        // Run the build (this is async and may take time)
        await runSeoOsBuild(config);
        
        // Read BUILD-SUMMARY.json to return results
        const fs = require("fs");
        const path = require("path");
        const slug = config.businessName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "")
            .substring(0, 50);
        
        const summaryPath = path.join(process.cwd(), "outputs", slug, "BUILD-SUMMARY.json");
        
        if (fs.existsSync(summaryPath)) {
            const summary = JSON.parse(fs.readFileSync(summaryPath, "utf-8"));
            return NextResponse.json({
                success: true,
                slug,
                summary,
                outputPath: `/outputs/${slug}`,
            });
        }
        
        return NextResponse.json({
            success: true,
            slug,
            message: "Build complete",
        });
    } catch (error: any) {
        console.error("API error:", error);
        return NextResponse.json(
            { error: error.message || "Build failed" },
            { status: 500 }
        );
    }
}

