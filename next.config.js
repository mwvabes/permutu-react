/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    AUTH_API_PUBLIC_ADDRESS: process.env.AUTH_API_PUBLIC_ADDRESS || "http://localhost:8005",
    COMMUNITY_API_PUBLIC_ADDRESS: process.env.COMMUNITY_API_PUBLIC_ADDRESS || "http://localhost:8006",
    GAMEPLAY_API_PUBLIC_ADDRESS: process.env.GAMEPLAY_API_PUBLIC_ADDRESS || "http://localhost:8007",
    AUTH_FRONTEND_PUBLIC_ADDRESS: process.env.AUTH_FRONTEND_PUBLIC_ADDRESS || "http://localhost:3000",
  },
  i18n: {
    locales: ['en', 'pl'],
    defaultLocale: 'pl'
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/(.*?)",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: 'true' },
          { key: "Access-Control-Allow-Origin", value: `${process.env.AUTH_FRONTEND_PUBLIC_ADDRESS}` },
          { key: "Access-Control-Allow-Methods", value: "GET,POST" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
}
