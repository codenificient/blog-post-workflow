const core = require('@actions/core');
const fetch = require('node-fetch');

/**
 * Hashnode GraphQL API client for fetching blog posts
 */
class HashnodeClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.endpoint = 'https://api.hashnode.com/';
    }

    /**
     * Fetch blog posts for a specific GitHub username
     * @param {string} githubUsername - GitHub username to fetch posts for
     * @param {number} maxPosts - Maximum number of posts to fetch
     * @returns {Promise<Array>} Array of blog posts
     */
    async fetchPosts(githubUsername, maxPosts = 5) {
        try {
            const query = `
                query GetUserArticles($username: String!, $limit: Int!) {
                    user(username: $username) {
                        publication {
                            posts(page: 0, limit: $limit) {
                                title
                                slug
                                brief
                                dateAdded
                                tags {
                                    name
                                }
                                coverImage
                                totalReactions
                                responseCount
                            }
                        }
                    }
                }
            `;

            const variables = {
                username: githubUsername,
                limit: Math.max(maxPosts, 10) // Fetch a bit more to account for filtering
            };

            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.apiKey,
                },
                body: JSON.stringify({
                    query,
                    variables
                })
            });

            if (!response.ok) {
                throw new Error(`Hashnode API request failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.errors) {
                throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
            }

            if (!data.data?.user?.publication?.posts) {
                core.warning(`No posts found for GitHub username: ${githubUsername}`);
                return [];
            }

            const posts = data.data.user.publication.posts;
            
            // Transform Hashnode posts to match the expected format
            return posts.slice(0, maxPosts).map(post => ({
                title: post.title,
                url: `https://hashnode.com/${post.slug}`,
                description: post.brief || '',
                date: new Date(post.dateAdded),
                categories: post.tags ? post.tags.map(tag => tag.name) : [],
                coverImage: post.coverImage,
                totalReactions: post.totalReactions,
                responseCount: post.responseCount
            }));

        } catch (error) {
            core.error(`Failed to fetch Hashnode posts: ${error.message}`);
            throw error;
        }
    }

    /**
     * Fetch posts using publication domain (alternative method)
     * @param {string} publicationDomain - Hashnode publication domain
     * @param {number} maxPosts - Maximum number of posts to fetch
     * @returns {Promise<Array>} Array of blog posts
     */
    async fetchPostsByPublication(publicationDomain, maxPosts = 5) {
        try {
            const query = `
                query GetPublicationArticles($domain: String!, $limit: Int!) {
                    publication(domain: $domain) {
                        posts(page: 0, limit: $limit) {
                            title
                            slug
                            brief
                            dateAdded
                            tags {
                                name
                            }
                            coverImage
                            totalReactions
                            responseCount
                        }
                    }
                }
            `;

            const variables = {
                domain: publicationDomain,
                limit: Math.max(maxPosts, 10)
            };

            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.apiKey,
                },
                body: JSON.stringify({
                    query,
                    variables
                })
            });

            if (!response.ok) {
                throw new Error(`Hashnode API request failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.errors) {
                throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
            }

            if (!data.data?.publication?.posts) {
                core.warning(`No posts found for publication domain: ${publicationDomain}`);
                return [];
            }

            const posts = data.data.publication.posts;
            
            return posts.slice(0, maxPosts).map(post => ({
                title: post.title,
                url: `https://hashnode.com/${post.slug}`,
                description: post.brief || '',
                date: new Date(post.dateAdded),
                categories: post.tags ? post.tags.map(tag => tag.name) : [],
                coverImage: post.coverImage,
                totalReactions: post.totalReactions,
                responseCount: post.responseCount
            }));

        } catch (error) {
            core.error(`Failed to fetch Hashnode posts by publication: ${error.message}`);
            throw error;
        }
    }
}

module.exports = HashnodeClient;
