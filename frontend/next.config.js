/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**"
            }
        ],
        unoptimized: true,
    },
    reactStrictMode: false,
}

module.exports = nextConfig
