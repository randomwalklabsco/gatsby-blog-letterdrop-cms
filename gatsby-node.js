const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  const result = await graphql(
    `
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
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allLetterdropPosts.nodes

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostUrl = index === 0 ? null : posts[index - 1].url
      const nextPostUrl = index === posts.length - 1 ? null : posts[index + 1].url

      createPage({
        path: post.url,
        component: blogPost,
        context: {
          id: post.id,
          url: post.url,
          previousPostUrl,
          nextPostUrl,
        },
      })
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  // const { createNodeField } = actions

  // if (node.internal.type === `LetterdropPosts`) {
  //   const value = createFilePath({ node, getNode })

  //   createNodeField({
  //     name: `url`,
  //     node,
  //     value,
  //   })
  // }
}
