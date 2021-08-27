module.exports = {
  siteMetadata: {
    title: `Letterdrop's Gatsby blog starter`,
    author: {
      name: `Letterdrop`,
      summary: ` - Your content marketing on auto-pilot`,
    },
    description: `Increase organic traffic by 30% and generate leads with high-performing content. A workflow and platform to create SEO-optimized blog posts, newsletters, and email marketing campaigns. Manage the content creation process and access talent to write for you.`,
    siteUrl: `https://www.glenwoodsystems.com/`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
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
            serialize: ({ query: { site, allLetterdropPosts } }) => {
              return allLetterdropPosts.nodes.map(node => {
                return Object.assign(
                  {},
                  {
                    title: node.title,
                    date: node.publishedOn,
                  },
                  {
                    description: node.subtitle || node.text,
                    date: node.publishedOn,
                    url: site.siteMetadata.siteUrl + node.url,
                    guid: site.siteMetadata.siteUrl + node.url,
                    custom_elements: [{ "content:encoded": node.text }],
                  }
                )
              })
            },
            query: `
              {
                allLetterdropPosts(sort: { fields: [publishedOn], order: DESC }) {
                  nodes {
                    id
                    url
                    title
                    publishedOn
                    coverImage {
                      url
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
          },
        ],
      },
    },
    {
      resolve: "@letterdropcom/gatsby-source-letterdrop",
      options: {
        apikey: "RDPHXKG-J0K43ZD-NB8R2J0-8SEGRXQ", // sample Letterdrop publication key
        version: "v1",
      },
    },
  ],
}
