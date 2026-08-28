import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com", pathname: "/vi/**" },
    ],
  },
  transpilePackages: ["katex"],
};

export default withPWA(nextConfig);
