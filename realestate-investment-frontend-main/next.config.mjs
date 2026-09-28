/** @type {import('next').NextConfig} */
function normalizeUrlEnvironmentVariable(name) {
  const value = process.env[name];

  if (!value) return;

  try {
    new URL(value);
    return;
  } catch {
    // Netlify environment values are occasionally pasted as Markdown links.
    // Recover the link target before NextAuth parses it during prerendering.
    const markdownTarget = value.match(/\]\((https?:\/\/[^\s)]+)\)/)?.[1];

    if (markdownTarget) {
      try {
        process.env[name] = new URL(markdownTarget).toString().replace(/\/$/, "");
        return;
      } catch {
        // Fall through and remove the unusable value.
      }
    }

    delete process.env[name];
  }
}

normalizeUrlEnvironmentVariable("NEXTAUTH_URL");
normalizeUrlEnvironmentVariable("NEXTAUTH_URL_INTERNAL");

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
