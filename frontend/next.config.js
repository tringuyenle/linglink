/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl({
    // Other Next.js configuration ...
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
    future: {

        // by default, if you customize webpack config, they switch back to version 4.
        // Looks like backward compatibility approach.
        webpack5: true,   
      },
    
      webpack(config) {
        config.resolve.fallback = {
    
          // if you miss it, all the other options in fallback, specified
          // by next.js will be dropped.
          ...config.resolve.fallback,  
    
          fs: false, // the solution
        };
        
        return config;
      }, 
});
// const nextConfig = {

//     images: {
//         remotePatterns: [
//             {
//                 protocol: "https",
//                 hostname: "**"
//             }
//         ],
//         unoptimized: true,
//     },
//     reactStrictMode: false,
// }

// module.exports = nextConfig
