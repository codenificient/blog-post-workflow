#!/usr/bin/env node

/**
 * Simple test script for Hashnode client
 * Run with: node test-hashnode.js
 */

const HashnodeClient = require('./src/hashnode-client');

async function testHashnodeClient() {
    console.log('🧪 Testing Hashnode Client...\n');
    
    // Check if API key is provided
    const apiKey = process.env.HASHNODE_API_KEY;
    const username = process.env.GITHUB_USERNAME || 'gautamkrishnar'; // Default test username
    
    if (!apiKey) {
        console.log('❌ HASHNODE_API_KEY environment variable not set');
        console.log('Set it with: export HASHNODE_API_KEY="your-api-key"');
        console.log('Or run: HASHNODE_API_KEY="your-api-key" node test-hashnode.js\n');
        return;
    }
    
    console.log(`🔑 Using API key: ${apiKey.substring(0, 10)}...`);
    console.log(`👤 Testing with username: ${username}\n`);
    
    try {
        const client = new HashnodeClient(apiKey);
        
        console.log('📡 Fetching posts...');
        const posts = await client.fetchPosts(username, 3);
        
        if (posts.length === 0) {
            console.log('⚠️  No posts found');
        } else {
            console.log(`✅ Found ${posts.length} posts:\n`);
            
            posts.forEach((post, index) => {
                console.log(`${index + 1}. ${post.title}`);
                console.log(`   📍 ${post.url}`);
                console.log(`   📅 ${post.date.toISOString().split('T')[0]}`);
                console.log(`   🏷️  ${post.categories.join(', ') || 'No tags'}`);
                console.log(`   💬 ${post.responseCount || 0} responses`);
                console.log(`   ❤️  ${post.totalReactions || 0} reactions`);
                console.log('');
            });
        }
        
    } catch (error) {
        console.error('❌ Error testing Hashnode client:');
        console.error(error.message);
        
        if (error.message.includes('401')) {
            console.log('\n💡 This usually means your API key is invalid or expired');
        } else if (error.message.includes('404')) {
            console.log('\n💡 This usually means the username was not found');
        }
    }
}

// Run the test
testHashnodeClient().catch(console.error);
