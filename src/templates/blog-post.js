import * as React from "react";
import { Link, graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";

const BlogPostTemplate = ({ data, location }) => {
  const post = data.allLetterdropPosts.nodes[0];
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const previousPost = data.previous.nodes[0];
  const nextPost = data.next.nodes[0];
  console.log(post);
  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={post.title} description={post.subtitle} />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header style={{ width: "100%" }}>
          <div style={{ textAlign: "center" }}>
            <img
              class="post-cover"
              src={post.coverImage.url}
              alt="post cover"
            />
          </div>
          <h1 itemProp="headline">{post.title}</h1>
          <p>{post.publishedOn}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.htmlText || post.text }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0
          }}
        >
          <li>
            {previousPost && (
              <Link to={"../" + previousPost.url} rel="prev">
                ← {previousPost.title}
              </Link>
            )}
          </li>
          <li>
            {nextPost && (
              <Link to={"../" + nextPost.url} rel="next" className="navLinks">
                {nextPost.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $url: String
    $previousPostUrl: String
    $nextPostUrl: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    allLetterdropPosts(filter: { url: { eq: $url } }) {
      nodes {
        title
        subtitle
        text
        publishedOn(formatString: "MMMM DD YYYY")
        coverImage {
          url
        }
      }
    }
    previous: allLetterdropPosts(filter: { url: { eq: $previousPostUrl } }) {
      nodes {
        url
        title
      }
    }
    next: allLetterdropPosts(filter: { url: { eq: $nextPostUrl } }) {
      nodes {
        url
        title
      }
    }
  }
`;
