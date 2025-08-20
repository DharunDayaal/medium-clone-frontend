import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: `
                            default-src 'self' 'unsafe-inline' 'unsafe-eval';
                            script-src 'self' 'unsafe-inline' 'unsafe-eval';
                            connect-src 'self' https://medium-clone-backend-flame.vercel.app
                            image-src 'self' data:;
                            media-src 'self';
                            object-src 'none';
                            frame-ancestors 'none';
                            upgrade-insecure-requests

                        `.replace(/\s{2,}/g, ' ')
                        .trim(),
                    },
                    {
						key: 'X-DNS-Prefetch-Control',
						value: 'on',
					},
					{
						key: 'X-Frame-Options',
						value: 'SAMEORIGIN',
					},
					{
						key: 'Strict-Transport-Security',
						value: 'max-age=31536000; includeSubDomains; preload',
					},

					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'Referrer-Policy',
						value: 'origin-when-cross-origin',
					},
					{
						key: 'Permissions-Policy',
						value: 'geolocation=(), microphone=(), camera=()',
					},
                ]
            }
        ]
    }
};

export default nextConfig;
