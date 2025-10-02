/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://next-imovie.vercel.app" || process.env.NEXTAUTH_URL,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/api/", "/auth/", "/watch/", "/admin/"] },
    ],
  },
};
