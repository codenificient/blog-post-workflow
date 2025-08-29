# Profile README Setup Guide

This guide will help you set up the Hashnode blog post integration with your GitHub profile README at [https://github.com/codenificient/codenificient](https://github.com/codenificient/codenificient).

## 🎯 What This Will Do

Automatically update your GitHub profile README with your latest Hashnode blog posts every 6 hours, keeping your profile fresh and engaging.

## 📋 Prerequisites

1. **Hashnode API Key** - Get it from [Hashnode Developer Settings](https://hashnode.com/settings/developer)
2. **GitHub Personal Access Token** - With `repo` scope for your profile repository
3. **Profile Repository** - Must be named exactly `codenificient/codenificient`

## 🚀 Step-by-Step Setup

### Step 1: Get Your Hashnode API Key

1. Go to [Hashnode Developer Settings](https://hashnode.com/settings/developer)
2. Click "Generate API Key"
3. Copy the generated key (you'll need this for Step 3)

### Step 2: Create GitHub Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name like "Profile README Update Bot"
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again)

### Step 3: Add Secrets to Your Profile Repository

1. Go to [https://github.com/codenificient/codenificient](https://github.com/codenificient/codenificient)
2. Click **Settings** tab
3. Click **Secrets and variables** → **Actions** in the left sidebar
4. Click **New repository secret**
5. Add these two secrets:

#### Secret 1: `HASHNODE_API_KEY`
- **Name**: `HASHNODE_API_KEY`
- **Value**: Your Hashnode API key from Step 1

#### Secret 2: `PROFILE_TOKEN`
- **Name**: `PROFILE_TOKEN`
- **Value**: Your GitHub personal access token from Step 2

### Step 4: Add Blog Post Markers to Your Profile README

1. In your profile repository, edit `README.md`
2. Add these markers where you want the blog posts to appear:

```markdown
<!-- BLOG-POST-LIST:START -->
<!-- BLOG-POST-LIST:END -->
```

**Example README structure:**
```markdown
# Hi there, I'm codenificient 👋

## 🚀 About Me
I'm a developer passionate about...

## 📝 Latest Blog Posts
<!-- BLOG-POST-LIST:START -->
<!-- BLOG-POST-LIST:END -->

## 🛠️ Technologies
- JavaScript, Python, React...
```

### Step 5: Test the Integration

1. Go to your profile repository: [https://github.com/codenificient/codenificient](https://github.com/codenificient/codenificient)
2. Click **Actions** tab
3. Click **Update Profile README with Hashnode Blog Posts**
4. Click **Run workflow** → **Run workflow**
5. Watch the workflow run and check for success

## 🔧 Configuration Options

The workflow is pre-configured with these settings:

- **Update Frequency**: Every 6 hours
- **Posts Displayed**: 5 latest posts
- **Sort Order**: Newest first
- **Date Format**: "Mon Aug 29 2025"
- **Title Length**: Max 80 characters
- **Description Length**: Max 120 characters
- **Auto-commit**: Enabled with descriptive messages

## 📊 Expected Output

Your README will automatically show posts like this:

```markdown
## 📝 Latest Blog Posts

1. **Day 5 of Demolishing My Stack of Unfinished Projects: The AI-Assisted Development Revolution**
   - 📅 Mon Aug 28 2025
   - 🏷️ MacBook Pro, project management
   - 🔗 [Read more](https://hashnode.com/day-5-of-demolishing-my-stack-of-unfinished-projects-the-ai-assisted-development-revolution)

2. **The Aspiring AI Engineer: Educative Learning Path**
   - 📅 Mon Aug 28 2025
   - 🏷️ Python, Machine Learning, educative, Career Growth
   - 🔗 [Read more](https://hashnode.com/the-aspiring-ai-engineer-educative-learning-path)
```

## 🚨 Troubleshooting

### Common Issues

1. **"Repository not found"**
   - Ensure your profile repository is named exactly `codenificient/codenificient`
   - Check that the `PROFILE_TOKEN` has `repo` scope

2. **"API key invalid"**
   - Verify your Hashnode API key is correct
   - Check that the key hasn't expired

3. **"No posts found"**
   - Verify your Hashnode username: `codenificient.hashnode.dev`
   - Ensure you have published posts on Hashnode

4. **"Permission denied"**
   - Check that `PROFILE_TOKEN` has `repo` scope
   - Ensure the token hasn't expired

### Debug Steps

1. Check the Actions tab for error messages
2. Verify all secrets are set correctly
3. Test your Hashnode API key locally using the test script:
   ```bash
   npm run test:hashnode
   ```

## 🔄 Manual Updates

You can manually trigger updates anytime:

1. Go to **Actions** tab in your profile repository
2. Click **Update Profile README with Hashnode Blog Posts**
3. Click **Run workflow**

## 📈 Monitoring

- **Workflow History**: Check the Actions tab for run history
- **Update Frequency**: Runs every 6 hours automatically
- **Last Update**: Check commit history for recent updates

## 🎉 Success Indicators

- ✅ Workflow runs successfully in Actions tab
- ✅ New commits appear in your profile repository
- ✅ Blog posts appear between the markers in your README
- ✅ Updates happen automatically every 6 hours

## 🆘 Need Help?

1. Check the [HASHNODE_INTEGRATION.md](HASHNODE_INTEGRATION.md) for technical details
2. Review the [LOCAL_TESTING.md](LOCAL_TESTING.md) for testing guidance
3. Open an issue in this repository if you encounter problems

---

**Your profile README will now automatically showcase your latest Hashnode blog posts! 🚀**
