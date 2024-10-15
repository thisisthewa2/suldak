/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "122.45.170.200",
        port: "8081",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // 폰트 파일을 위한 rule 추가
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: "asset/resource",
    });

    return config;
  },
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://122.45.170.200:8081/api/:path*",
      },
    ];
  },
};

export default nextConfig;
