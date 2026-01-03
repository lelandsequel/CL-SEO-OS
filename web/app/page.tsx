"use client";

import { useState } from "react";

export default function HomePage() {
    const [formData, setFormData] = useState({
        currentUrl: "",
        businessName: "",
        description: "",
        specialRequests: "",
        includeAudit: true,
        generateDeck: true,
        generateProposal: true,
    });
    
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);
        
        try {
            const response = await fetch("/api/run", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentUrl: formData.currentUrl,
                    businessName: formData.businessName,
                    description: formData.description,
                    specialRequests: formData.specialRequests || undefined,
                    toggles: {
                        includeAudit: formData.includeAudit,
                        generateDeck: formData.generateDeck,
                        generateProposal: formData.generateProposal,
                    },
                }),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || "Build failed");
            }
            
            setResult(data);
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
            <h1>SEO OS++ Builder</h1>
            <p>Generate a complete SEO-optimized site with audit, deck, and proposal.</p>
            
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                    <label>
                        Current URL:
                        <input
                            type="url"
                            value={formData.currentUrl}
                            onChange={(e) => setFormData({ ...formData, currentUrl: e.target.value })}
                            required
                            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
                        />
                    </label>
                </div>
                
                <div>
                    <label>
                        Business Name:
                        <input
                            type="text"
                            value={formData.businessName}
                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                            required
                            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
                        />
                    </label>
                </div>
                
                <div>
                    <label>
                        Description:
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                            rows={3}
                            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
                        />
                    </label>
                </div>
                
                <div>
                    <label>
                        Special Requests (optional):
                        <textarea
                            value={formData.specialRequests}
                            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                            rows={2}
                            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
                        />
                    </label>
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={formData.includeAudit}
                            onChange={(e) => setFormData({ ...formData, includeAudit: e.target.checked })}
                        />
                        Include Audit (Phase 0)
                    </label>
                    
                    <label>
                        <input
                            type="checkbox"
                            checked={formData.generateDeck}
                            onChange={(e) => setFormData({ ...formData, generateDeck: e.target.checked })}
                        />
                        Generate Deck
                    </label>
                    
                    <label>
                        <input
                            type="checkbox"
                            checked={formData.generateProposal}
                            onChange={(e) => setFormData({ ...formData, generateProposal: e.target.checked })}
                        />
                        Generate Proposal
                    </label>
                </div>
                
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: "0.75rem 1.5rem",
                        backgroundColor: "#0066cc",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: loading ? "not-allowed" : "pointer",
                    }}
                >
                    {loading ? "Running..." : "Run SEO OS++ Build"}
                </button>
            </form>
            
            {error && (
                <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#fee", color: "#c00", borderRadius: "4px" }}>
                    <strong>Error:</strong> {error}
                </div>
            )}
            
            {result && (
                <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#efe", borderRadius: "4px" }}>
                    <h2>Build Complete!</h2>
                    <p><strong>Slug:</strong> {result.slug}</p>
                    {result.summary && (
                        <>
                            {result.summary.auditScore !== null && (
                                <p><strong>Audit Score:</strong> {result.summary.auditScore}/100</p>
                            )}
                            {result.summary.pagesGenerated && (
                                <p><strong>Pages Generated:</strong> {result.summary.pagesGenerated.total}</p>
                            )}
                            {result.summary.findingsCount > 0 && (
                                <p><strong>Findings:</strong> {result.summary.findingsCount}</p>
                            )}
                        </>
                    )}
                    <p><strong>Output Path:</strong> {result.outputPath}</p>
                </div>
            )}
        </div>
    );
}

