/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
   typescript: {
  ignoreBuildErrors: true,
},
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      },
      {
        protocol: "https",
        hostname: "hiveconstruction.onrender.com"
      }
    ]
  }
};

export default nextConfig;
