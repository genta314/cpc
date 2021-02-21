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
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        setup(ref) {
          const metaInfo = ref.query.site.siteMetadata
          metaInfo.generator = "GatsbyJS test"
          return metaInfo
        },
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize(value) {
              const rssMetadata = value.query.site.siteMetadata
              return value.query.allPrismicPost.edges.map(edge => ({
                description: edge.node.data.post_title.text,               
                date: edge.node.first_publication_date,
                url: rssMetadata.siteUrl + edge.node.uid,
                guid: rssMetadata.siteUrl + edge.node.uid,
                
              }))
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Cynical Penguin Cafe",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/blog/",
            // optional configuration to specify external rss feed, such as feedburner
            link: "http://feeds.feedburner.com/lowmuzic/rss",
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
