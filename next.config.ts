import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Replace wildcard with actual domain for security
      },
    ],
  },
};

export default nextConfig;













// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: ['res.cloudinary.com'],
//     dangerouslyAllowSVG: true,
//     remotePatterns:[
//       {
//         protocol: 'https',
//         hostname: '*',
//       }
//     ]
//   },
// };

// export default nextConfig;
