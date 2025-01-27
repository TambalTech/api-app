/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
           { protocol:'https',
            hostname:'tambaltech.com'}
            
        ]
    }, env: {
        NEXT_PUBLIC_WP_JSON_URL: process.env.NEXT_PUBLIC_WP_JSON_URL,
        WP_NS: process.env.WP_NS,
        WP_API_VERSION: process.env.WP_API_VERSION,
        MY_NS: process.env.MY_NS,
        MY_API_VERSION: process.env.MY_API_VERSION,
        JWT_NS: process.env.JWT_NS,
        JWT_API_VERSION: process.env.JWT_API_VERSION
      }
    
};

export default nextConfig;
