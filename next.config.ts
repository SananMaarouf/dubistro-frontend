import { tr } from "motion/react-client";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ["nb", "fr"],
    defaultLocale: "nb",
    localeDetection: false,
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
