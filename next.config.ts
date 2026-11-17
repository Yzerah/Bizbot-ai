import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Hebrew fonts are read from disk when rendering the quote PDF.
  outputFileTracingIncludes: {
    "/api/quotes/**": ["./assets/fonts/**"],
  },
  experimental: {
    serverActions: { bodySizeLimit: "2mb" },
  },
  async redirects() {
    return [
      {
        source: "/websites/examples/clinic",
        destination: "/websites/examples/accounting",
        permanent: true,
      },
      // public/google30a65c06550bbcc7.html is Search Console file verification.
      // Do not redirect or rewrite that path.
    ];
  },
};

export default nextConfig;
