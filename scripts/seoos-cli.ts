#!/usr/bin/env npx ts-node
/**
 * SEO OS++ CLI
 *
 * Usage:
 *   pnpm seoos:run -- --url <url> --name "<name>" --desc "<desc>" [--audit true|false] [--deck true|false] [--proposal true|false]
 */

import { runSeoOsBuild, SEOOSConfig } from "../lib/seo-os-runner";

function parseArgs(): SEOOSConfig {
    const args = process.argv.slice(2);
    
    let currentUrl = "";
    let businessName = "";
    let description = "";
    let specialRequests: string | undefined;
    let includeAudit = true;
    let generateDeck = true;
    let generateProposal = true;
    
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        
        if (arg === "--url" && args[i + 1]) {
            currentUrl = args[++i];
        } else if (arg === "--name" && args[i + 1]) {
            businessName = args[++i];
        } else if (arg === "--desc" && args[i + 1]) {
            description = args[++i];
        } else if (arg === "--requests" && args[i + 1]) {
            specialRequests = args[++i];
        } else if (arg === "--audit" && args[i + 1]) {
            includeAudit = args[++i] === "true";
        } else if (arg === "--deck" && args[i + 1]) {
            generateDeck = args[++i] === "true";
        } else if (arg === "--proposal" && args[i + 1]) {
            generateProposal = args[++i] === "true";
        }
    }
    
    if (!currentUrl || !businessName || !description) {
        console.error("Usage: pnpm seoos:run -- --url <url> --name \"<name>\" --desc \"<desc>\" [--audit true|false] [--deck true|false] [--proposal true|false]");
        process.exit(1);
    }
    
    return {
        currentUrl,
        businessName,
        description,
        specialRequests,
        toggles: {
            includeAudit,
            generateDeck,
            generateProposal,
        },
    };
}

async function main() {
    const config = parseArgs();
    
    console.log("\n╔════════════════════════════════════════════════════════════╗");
    console.log("║                  SEO OS++ CLI                              ║");
    console.log("╚════════════════════════════════════════════════════════════╝\n");
    
    try {
        await runSeoOsBuild(config);
        console.log("\n✅ Build complete!");
        process.exit(0);
    } catch (error) {
        console.error("\n❌ Build failed:", error);
        process.exit(1);
    }
}

main();

