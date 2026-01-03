/** @type {import('next').NextConfig} */
const nextConfig = {
    // Allow API routes to access parent directory
    serverRuntimeConfig: {
        projectRoot: process.cwd(),
    },
};

module.exports = nextConfig;

