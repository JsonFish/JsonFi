import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    dangerouslyAllowSVG: true, // 必须开启，因为 Dicebear 返回的是 SVG
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // 安全策略
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        pathname: "/**", // 放宽路径限制，确保所有版本都能加载
      },
    ],
  },
};

export default nextConfig;
