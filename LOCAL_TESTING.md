# Local Testing Guide

## Live Test Results

> **Last Test Run**: 2025-08-29 at 04:19:59 UTC  
> **Status**: ✅ **SUCCESS** - Hashnode integration working correctly  
> **Tested Username**: `codenificient.hashnode.dev`  
> **Posts Retrieved**: 6

### Test Output

The following test was run successfully using the Hashnode GraphQL API:

```bash
npm run test:hashnode
```

**Result**: Found 6 blog posts from Hashnode

1. **Day 5 of Demolishing My Stack of Unfinished Projects: The AI-Assisted Development Revolution**
   - **URL**: [https://hashnode.com/day-5-of-demolishing-my-stack-of-unfinished-projects-the-ai-assisted-development-revolution](https://hashnode.com/day-5-of-demolishing-my-stack-of-unfinished-projects-the-ai-assisted-development-revolution)
   - **Date**: 2025-08-28
   - **Tags**: MacBook Pro, project management
   - **Responses**: 0
   - **Reactions**: 0

2. **The Aspiring AI Engineer: Educative Learning Path**
   - **URL**: [https://hashnode.com/the-aspiring-ai-engineer-educative-learning-path](https://hashnode.com/the-aspiring-ai-engineer-educative-learning-path)
   - **Date**: 2025-08-28
   - **Tags**: Python, Machine Learning, educative, Career Growth
   - **Responses**: 0
   - **Reactions**: 0

3. **Day 4 of Demolishing my Stack of Unfinished Projects: Secret Chat**
   - **URL**: [https://hashnode.com/day-4-of-demolishing-my-stack-of-unfinished-projects-secret-chat](https://hashnode.com/day-4-of-demolishing-my-stack-of-unfinished-projects-secret-chat)
   - **Date**: 2025-08-21
   - **Tags**: bolt.new, cursor IDE, end-to-end-encryption
   - **Responses**: 0
   - **Reactions**: 0

4. **Day 3 of Demolishing my Stack of Unfinished Projects: SmartNotes Project**
   - **URL**: [https://hashnode.com/day-3-of-demolishing-my-stack-of-unfinished-projects-smartnotes-project](https://hashnode.com/day-3-of-demolishing-my-stack-of-unfinished-projects-smartnotes-project)
   - **Date**: 2025-08-19
   - **Tags**: portfoliowebsite, openai, Pinecone
   - **Responses**: 0
   - **Reactions**: 0

5. **16 Redesigning my Portfolio Website**
   - **URL**: [https://hashnode.com/16-redesigning-my-portfolio-website](https://hashnode.com/16-redesigning-my-portfolio-website)
   - **Date**: 2025-08-19
   - **Tags**: openai, huggingface, portfolio, neondatabase
   - **Responses**: 0
   - **Reactions**: 0

6. **15 Redesigning my portfolio website**
   - **URL**: [https://hashnode.com/15-redesigning-my-portfolio-website](https://hashnode.com/15-redesigning-my-portfolio-website)
   - **Date**: 2025-06-21
   - **Tags**: neondatabase, portfolio, prisma
   - **Responses**: 0
   - **Reactions**: 0

### Test Summary

✅ **API Connection**: Successfully connected to Hashnode GraphQL API  
✅ **Authentication**: API key validated and working  
✅ **Data Retrieval**: Successfully fetched 6 blog posts  
✅ **Data Processing**: Posts correctly formatted and structured  
✅ **Integration Ready**: Package ready for production use

---

*This section is automatically updated each time the test script runs successfully.*

This guide explains how to test the Hashnode GraphQL integration locally on your machine.

## Prerequisites

1. **Node.js** (version 16 or higher)
2. **Hashnode API Key** - Get it from [Hashnode Developer Settings](https://hashnode.com/settings/developer)
3. **GitHub Username** - Your GitHub username to fetch Hashnode posts for

## Quick Setup

### Option 1: Automated Setup (Recommended)

#### For Linux/Mac:
```bash
./setup-env.sh
```

#### For Windows:
```cmd
setup-env.bat
```

### Option 2: Manual Setup

1. Create a `.env` file in the project root:
```bash
touch .env
```

2. Add your credentials to the `.env` file:
```env
HASHNODE_API_KEY=your_actual_api_key_here
GITHUB_USERNAME=your_github_username_here
GITHUB_TOKEN=your_github_token_here
TEST_MODE=true
```

## Testing the Hashnode Client

1. **Install dependencies** (if not already done):
```bash
npm install
```

2. **Run the test script**:
```bash
node test-hashnode.js
```

## Expected Output

### Successful Test:
```
🧪 Testing Hashnode Client...

🔑 Using API key: abc123def4...
👤 Testing with username: your-username

📡 Fetching posts...
✅ Found 3 posts:

1. My Latest Blog Post
   📍 https://hashnode.com/my-latest-blog-post
   📅 2024-01-15
   🏷️ JavaScript, Web Development
   💬 5 responses
   ❤️ 12 reactions
```

### Error Cases:

#### Missing API Key:
```
❌ HASHNODE_API_KEY environment variable not set

🔧 To set up your environment:
   • Run: ./setup-env.sh (Linux/Mac) or setup-env.bat (Windows)
   • Edit the .env file with your actual credentials
   • Or set manually: export HASHNODE_API_KEY="your-api-key"

📚 Get your Hashnode API key from: https://hashnode.com/settings/developer
```

#### Invalid API Key:
```
❌ Error testing Hashnode client:
Hashnode API request failed: 401 Unauthorized

💡 This usually means your API key is invalid or expired
   Check your Hashnode API key at: https://hashnode.com/settings/developer
```

## Troubleshooting

### Common Issues:

1. **"dotenv package not found"**
   - Run: `npm install dotenv`

2. **"Cannot find module 'hashnode-client'"**
   - Make sure you're in the project root directory
   - Run: `npm install` to install dependencies

3. **"Hashnode API request failed"**
   - Verify your API key is correct
   - Check if Hashnode API is accessible from your network
   - Ensure your API key has the necessary permissions

4. **"No posts found"**
   - Verify the GitHub username exists on Hashnode
   - Check if the user has published posts
   - Ensure the username is correctly linked to Hashnode

### Debug Mode:

To see more detailed information, you can set the `TEST_MODE` environment variable:

```bash
TEST_MODE=true node test-hashnode.js
```

## Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `HASHNODE_API_KEY` | Your Hashnode API key | Yes | - |
| `GITHUB_USERNAME` | GitHub username to fetch posts for | Yes | - |
| `GITHUB_TOKEN` | GitHub token for additional testing | No | - |
| `TEST_MODE` | Enable test mode | No | false |

## Security Notes

- **Never commit your `.env` file** - it's already in `.gitignore`
- **Keep your API keys secure** - don't share them publicly
- **Use environment variables** in production, not `.env` files
- **Rotate API keys regularly** for security

## Next Steps

After successful local testing:

1. **Deploy to GitHub Actions** using the workflow examples
2. **Set up GitHub Secrets** for your API keys
3. **Configure your README** with the blog post markers
4. **Automate updates** with scheduled workflows

## Support

If you encounter issues:

1. Check the [main README](README.md) for setup instructions
2. Review the [Hashnode Integration Guide](HASHNODE_INTEGRATION.md)
3. Check the [GitHub Issues](https://github.com/gautamkrishnar/blog-post-workflow/issues)
4. Ensure your Hashnode account and API key are properly configured
