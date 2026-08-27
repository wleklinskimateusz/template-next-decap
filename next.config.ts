import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  basePath: process.env.PAGES_BASE_PATH,
  assetPrefix: "/template-next-decap/",
};

export default nextConfig;
