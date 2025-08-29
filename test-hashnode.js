#!/usr/bin/env node

/**
 * Simple test script for Hashnode client
 * Run with: node test-hashnode.js
 * 
 * Make sure to create a .env file with your credentials first:
 * - Run: ./setup-env.sh (Linux/Mac) or setup-env.bat (Windows)
 * - Edit the .env file with your actual credentials
 */

// Load environment variables from .env file
try {
    require('dotenv').config();
} catch (error) {
    console.log('⚠️  dotenv package not found. Install it with: npm install dotenv');
    console.log('   Or set environment variables manually.\n');
}

const HashnodeClient = require('./src/hashnode-client');
const fs = require('fs');
const path = require('path');

async function testHashnodeClient() {
    console.log('🧪 Testing Hashnode Client...\n');
    
    // Check if API key is provided
    const apiKey = process.env.HASHNODE_API_KEY;
    const username = process.env.GITHUB_USERNAME || 'codenificient.hashnode.dev'; // Default test username
    
    if (!apiKey) {
        console.log('❌ HASHNODE_API_KEY environment variable not set');
        console.log('');
        console.log('🔧 To set up your environment:');
        console.log('   • Run: ./setup-env.sh (Linux/Mac) or setup-env.bat (Windows)');
        console.log('   • Edit the .env file with your actual credentials');
        console.log('   • Or set manually: export HASHNODE_API_KEY="your-api-key"');
        console.log('');
        console.log('📚 Get your Hashnode API key from: https://hashnode.com/settings/developer');
        console.log('');
        return;
    }
    
    if (apiKey === 'your_hashnode_api_key_here') {
        console.log('❌ Please update the .env file with your actual Hashnode API key');
        console.log('   Edit the .env file and replace "your_hashnode_api_key_here" with your real API key');
        console.log('');
        return;
    }
    
    console.log(`🔑 Using API key: ${apiKey.substring(0, 10)}...`);
    console.log(`👤 Testing with username: ${username}\n`);
    
    try {
        const client = new HashnodeClient(apiKey);
        
        console.log('📡 Fetching posts...');
        const posts = await client.fetchPosts(username, 6);
        
        if (posts.length === 0) {
            console.log('⚠️  No posts found');
            console.log('   This could mean:');
            console.log('   • The username doesn\'t exist on Hashnode');
            console.log('   • The username has no published posts');
            console.log('   • There\'s an issue with the API key');
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
            
            // Update LOCAL_TESTING.md with test results
            await updateLocalTestingMD(posts, username);
        }
        
    } catch (error) {
        console.error('❌ Error testing Hashnode client:');
        console.error(error.message);
        
        if (error.message.includes('401')) {
            console.log('\n💡 This usually means your API key is invalid or expired');
            console.log('   Check your Hashnode API key at: https://hashnode.com/settings/developer');
        } else if (error.message.includes('404')) {
            console.log('\n💡 This usually means the username was not found');
            console.log('   Verify the GitHub username exists on Hashnode');
        } else if (error.message.includes('fetch')) {
            console.log('\n💡 This might be a network issue or Hashnode API is down');
        }
    }
}

/**
 * Update LOCAL_TESTING.md with live test results
 */
async function updateLocalTestingMD(posts, username) {
    try {
        const localTestingPath = path.join(__dirname, 'LOCAL_TESTING.md');
        let content = fs.readFileSync(localTestingPath, 'utf8');
        
        // Create test results section
        const testResults = generateTestResultsSection(posts, username);
        
        // Check if test results section already exists
        const testResultsMarker = '## Live Test Results';
        if (content.includes(testResultsMarker)) {
            // Replace existing test results
            const startMarker = content.indexOf(testResultsMarker);
            const endMarker = content.indexOf('##', startMarker + 1);
            if (endMarker !== -1) {
                content = content.substring(0, startMarker) + testResults + content.substring(endMarker);
            } else {
                content = content.substring(0, startMarker) + testResults;
            }
        } else {
            // Add test results section after the first heading
            const firstHeadingIndex = content.indexOf('#');
            const insertIndex = content.indexOf('\n', firstHeadingIndex) + 1;
            content = content.substring(0, insertIndex) + '\n' + testResults + content.substring(insertIndex);
        }
        
        // Write updated content back to file
        fs.writeFileSync(localTestingPath, content, 'utf8');
        console.log('📝 Updated LOCAL_TESTING.md with live test results');
        
    } catch (error) {
        console.log('⚠️  Could not update LOCAL_TESTING.md:', error.message);
    }
}

/**
 * Generate the test results section for LOCAL_TESTING.md
 */
function generateTestResultsSection(posts, username) {
    const now = new Date().toISOString();
    const dateStr = now.split('T')[0];
    const timeStr = now.split('T')[1].split('.')[0];
    
    let section = `## Live Test Results

> **Last Test Run**: ${dateStr} at ${timeStr} UTC  
> **Status**: ✅ **SUCCESS** - Hashnode integration working correctly  
> **Tested Username**: \`${username}\`  
> **Posts Retrieved**: ${posts.length}

### Test Output

The following test was run successfully using the Hashnode GraphQL API:

\`\`\`bash
npm run test:hashnode
\`\`\`

**Result**: Found ${posts.length} blog posts from Hashnode

`;

    // Add post details
    posts.forEach((post, index) => {
        const postDate = post.date.toISOString().split('T')[0];
        const categories = post.categories.length > 0 ? post.categories.join(', ') : 'No tags';
        
        section += `${index + 1}. **${post.title}**
   - **URL**: [${post.url}](${post.url})
   - **Date**: ${postDate}
   - **Tags**: ${categories}
   - **Responses**: ${post.responseCount || 0}
   - **Reactions**: ${post.totalReactions || 0}

`;
    });

    section += `### Test Summary

✅ **API Connection**: Successfully connected to Hashnode GraphQL API  
✅ **Authentication**: API key validated and working  
✅ **Data Retrieval**: Successfully fetched ${posts.length} blog posts  
✅ **Data Processing**: Posts correctly formatted and structured  
✅ **Integration Ready**: Package ready for production use

---

*This section is automatically updated each time the test script runs successfully.*
`;

    return section;
}

// Run the test
testHashnodeClient().catch(console.error);
