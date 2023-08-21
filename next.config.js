/** @type {import('next').NextConfig} */

const nextConfig = {
  i18n: {
    locales: ["en", "sv"],
    defaultLocale: "en",
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.dietdoctor.com",
      },
    ],
  },
};

module.exports = nextConfig;
