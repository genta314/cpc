require(`dotenv`).config({
  path: `.env`,
})

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

module.exports = {
  siteMetadata: {
    siteTitle: `Cynical Penguin Cafe`,
    siteTitleAlt: `Cynical Penguin Cafe - Turning the pages of life`,
    siteHeadline: `Cynical Penguin Cafe - Page by Page`,
    siteUrl: `https://lowmuzic.com`,
    siteDescription: `Turning the pages of life`,
    siteLanguage: `en`,
    siteImage: `/banner.jpg`,
    author: `unrest`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: `About`,
            slug: `/about`,
          },
        ],
        externalLinks: [
          {
            name: `Fediverse`,
            url: `https://curenoize.org`,
          },
          {
            name: `Diary`,
            url: `https://write.curenoize.org`,
          },
        ],
      },
    },
    {
    resolve: `gatsby-plugin-mdx`,
    options: {
      extensions: [`.md`, `.mdx`],
    },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Cynical Penguin Cafe - unrest/Turning the pages of life`,
        short_name: `Cynical Penguin Cafe`,
        description: `Turning the pages of life`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
  ].filter(Boolean),
}
