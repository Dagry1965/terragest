import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  outputFileTracingExcludes: {

    "*": [
      "./mobile/**/*",
    ],
  },
};

export default nextConfig;