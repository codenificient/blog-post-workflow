const fs = require('fs');
const path = require('path');
const core = require('@actions/core');
const HashnodeClient = require('./hashnode-client');

const PUBLICATION_DOMAIN = 'codenificient.hashnode.dev';
const MAX_POSTS = 5;

// FIXED LINE HERE 👇
const README_PATH = path.resolve(__dirname, '../profile-repo/README.md');

const START_MARKER = '<!-- BLOG-POST-LIST:START -->';
const END_MARKER = '<!-- BLOG-POST-LIST:END -->';

(async () => {
  try {
    const apiKey = process.env.HASHNODE_API_KEY;
    if (!apiKey) {
      throw new Error('Missing HASHNODE_API_KEY environment variable');
    }

    const client = new HashnodeClient(apiKey);
    const posts = await client.fetchPosts(PUBLICATION_DOMAIN, MAX_POSTS);

    if (!posts.length) {
      core.warning('No blog posts found');
      return;
    }

    const formattedPosts = posts.map(post => {
      const date = post.date.toISOString().split('T')[0];
      return `- [${post.title}](${post.url}) _(Published: ${date})_`;
    }).join('\n');

    const readme = fs.readFileSync(README_PATH, 'utf8');

    const startIndex = readme.indexOf(START_MARKER);
    const endIndex = readme.indexOf(END_MARKER);

    if (startIndex === -1 || endIndex === -1) {
      throw new Error('Cannot find BLOG-POST-LIST markers in README.md');
    }

    const before = readme.substring(0, startIndex + START_MARKER.length);
    const after = readme.substring(endIndex);

    const newContent = `${before}\n${formattedPosts}\n${after}`;
    fs.writeFileSync(README_PATH, newContent);

    console.log('✅ README.md updated with latest blog posts');
  } catch (error) {
    core.setFailed(`❌ Failed to update README: ${error.message}`);
  }
})();
