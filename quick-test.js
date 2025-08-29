#!/usr/bin/env node

/**
 * Quick test script for Hashnode client
 * This script can be run directly with environment variables
 * 
 * Usage examples:
 *   HASHNODE_API_KEY="your-key" GITHUB_USERNAME="your-host" node quick-test.js
 *   npm run test:hashnode:quick
 */

const HashnodeClient = require('./src/hashnode-client');

async function quickTest() {
    console.log('🚀 Quick Hashnode Test\n');
    
    const apiKey = process.env.HASHNODE_API_KEY;
    const username = process.env.GITHUB_USERNAME || 'codenificient.hashnode.dev';
    
    if (!apiKey) {
        console.log('❌ HASHNODE_API_KEY not set');
        console.log('   Set it with: export HASHNODE_API_KEY="your-api-key"');
        console.log('   Or run: HASHNODE_API_KEY="your-key" node quick-test.js');
        return;
    }
    
    console.log(`🔑 API Key: ${apiKey.substring(0, 10)}...`);
    console.log(`👤 Username: ${username}`);
    console.log('');
    
    try {
        const client = new HashnodeClient(apiKey);
        const posts = await client.fetchPosts(username, 3);
        
        if (posts.length > 0) {
            console.log(`✅ Success! Found ${posts.length} posts`);
            posts.forEach((post, i) => {
                console.log(`   ${i + 1}. ${post.title}`);
            });
        } else {
            console.log('⚠️  No posts found');
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

quickTest().catch(console.error);
