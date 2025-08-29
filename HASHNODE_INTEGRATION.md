# Hashnode GraphQL Integration

This package now supports fetching blog posts directly from Hashnode using their GraphQL API, eliminating the need for RSS feeds.

## New Input Parameters

### Required for Hashnode Integration
- **`hashnode_api_key`**: Your Hashnode API key (get it from [Hashnode Developer Settings](https://hashnode.com/settings/developer))
- **`github_username`**: Your GitHub username to fetch Hashnode posts for

### Optional (for backward compatibility)
- **`feed_list`**: RSS feed URLs (legacy support)

## How It Works

1. **Hashnode Priority**: If both `hashnode_api_key` and `github_username` are provided, the action will use Hashnode's GraphQL API
2. **Fallback to RSS**: If Hashnode credentials are not provided, it falls back to the original RSS feed functionality
3. **Same Output Format**: Both methods produce the same blog post format for your README

## Setup Instructions

### 1. Get Your Hashnode API Key

1. Go to [Hashnode Settings](https://hashnode.com/settings/developer)
2. Navigate to the "Developer" section
3. Generate a new API key
4. Copy the API key

### 2. Update Your GitHub Action

```yaml
name: Update README with Hashnode Posts

on:
  schedule:
    - cron: '0 15 * * 0'  # Daily at midnight
  workflow_dispatch:      # Manual trigger

jobs:
  update-readme:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Update README with Hashnode Posts
        uses: ./
        with:
          hashnode_api_key: ${{ secrets.HASHNODE_API_KEY }}
          github_username: 'codenificient'
          max_post_count: '5'
          template: 'default'
          readme_path: './README.md'
          gh_token: ${{ secrets.PAT_1 }}
```

### 3. Add GitHub Secrets

1. Go to your repository settings
2. Navigate to "Secrets and variables" → "Actions"
3. Add a new secret named `HASHNODE_API_KEY`
4. Paste your Hashnode API key

### 4. Add README Markers

Add these markers to your README file where you want the blog posts to appear:

```markdown
<!-- BLOG-POST-LIST:START -->
<!-- BLOG-POST-LIST:END -->
```

## Configuration Options

### Basic Configuration
```yaml
hashnode_api_key: ${{ secrets.HASHNODE_API_KEY }}
github_username: 'your-github-username'
max_post_count: '5'
```

### Advanced Configuration
```yaml
hashnode_api_key: ${{ secrets.HASHNODE_API_KEY }}
github_username: 'your-github-username'
max_post_count: '10'
template: '- [$title]($url) - $date'
date_format: 'yyyy-mm-dd'
title_max_length: '50'
description_max_length: '100'
```

## Template Variables

The same template variables work with Hashnode posts:

- `$title` - Post title
- `$url` - Post URL
- `$description` - Post brief/description
- `$date` - Publication date
- `$categories` - Post tags
- `$counter` - Post number
- `$newline` - Line break

## Example Templates

### Default Template
```yaml
template: 'default'
# Output: - [Post Title](https://hashnode.com/post-slug)
```

### Custom Template
```yaml
template: '📝 [$title]($url)\n📅 $date\n🏷️ $categories\n\n'
```

### Minimal Template
```yaml
template: '• [$title]($url)'
```

## Error Handling

- **API Key Issues**: Check your Hashnode API key and permissions
- **Username Not Found**: Verify the GitHub username exists on Hashnode
- **Rate Limiting**: Hashnode has rate limits; the action includes retry logic
- **No Posts**: Action will show a warning if no posts are found

## Troubleshooting

### Common Issues

1. **"No posts found" error**
   - Verify your GitHub username is correct
   - Check if you have published posts on Hashnode
   - Ensure your Hashnode account is linked to your GitHub username

2. **"Hashnode API request failed" error**
   - Verify your API key is correct
   - Check if your API key has the necessary permissions
   - Ensure you're not hitting rate limits

3. **Posts not appearing in README**
   - Check if the README markers are present
   - Verify the action has write permissions to your repository
   - Check the action logs for any errors

### Debug Mode

Add this to your action to see detailed logs:

```yaml
- name: Update README with Hashnode Posts
  uses: ./
  with:
    hashnode_api_key: ${{ secrets.HASHNODE_API_KEY }}
    github_username: 'your-github-username'
    # ... other options
  env:
    ACTIONS_STEP_DEBUG: true
```

## Migration from RSS

If you're currently using RSS feeds, you can easily migrate:

### Before (RSS)
```yaml
feed_list: 'https://your-blog.com/rss.xml'
```

### After (Hashnode)
```yaml
hashnode_api_key: ${{ secrets.HASHNODE_API_KEY }}
github_username: 'your-github-username'
```

## Benefits of Hashnode Integration

1. **No RSS Required**: Direct API access to your Hashnode posts
2. **Better Data**: Access to tags, reactions, and other metadata
3. **Reliable**: No dependency on RSS feed generation
4. **Real-time**: Always up-to-date with your latest posts
5. **Rich Content**: Access to post briefs, cover images, and more

## Security Notes

- Your Hashnode API key is stored as a GitHub secret and never exposed in logs
- The action only reads your public posts
- No sensitive data is stored or transmitted

## Support

If you encounter issues:

1. Check the [GitHub Issues](https://github.com/gautamkrishnar/blog-post-workflow/issues)
2. Verify your configuration matches the examples
3. Check the action logs for detailed error messages
4. Ensure your Hashnode account and API key are properly configured
