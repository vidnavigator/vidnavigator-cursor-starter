# 🎥 VidNavigator for Cursor

AI-powered video search, analysis, and transcription directly in [Cursor](https://cursor.so).

## 🚀 Quick Setup (2 minutes)

### 1. Get Your API Key
1. Sign up at [https://vidnavigator.com](https://vidnavigator.com)
2. Go to **User** → **Dev-tools**
3. Create and copy your API key (starts with `vna_`)

### 2. Configure MCP Server
1. Open **Cursor** → **Settings** → **Tools and integration**
2. Click **Add MCP server**
3. Paste the following configuration:

```jsonc
{
  "mcpServers": {
    "vidnavigator": {
      "type": "http",
      "url": "https://api.vidnavigator.com/mcp/",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY_HERE"
      }
    }
  }
}
```

**Important**: Replace `YOUR_API_KEY_HERE` with your actual API key.

**If you already have other MCP servers**, just add the `"vidnavigator"` block to your existing `"mcpServers"` list.

### 3. Start Using VidNavigator
Open any chat in Cursor and start using video-related commands!

### 4. (Optional) Enhanced Experience
For a curated experience, open [`vidnavigator.agent`](./vidnavigator.agent) in Cursor and click **Run**.

## 💬 Example Usage

Once configured, you can use these commands in any Cursor chat:

### Search for Videos
```
Find a video where Neil deGrasse Tyson explains quantum physics
```

### Analyze YouTube Videos
```
Analyze this video and give me the key points: https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

### Get Video Transcripts
```
Get the transcript for: https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

### Transcribe Social Media Videos
```
Transcribe this TikTok video: https://www.tiktok.com/@user/video/123456789
```

### Ask Follow-up Questions
```
What are the main arguments presented in this video?
```

### Check Your Usage
```
Show my current VidNavigator API usage
```

## 🔧 Available Tools

- **search_videos**: Search for videos with AI analysis and ranking
- **analyze_video**: Analyze video content and generate summaries  
- **get_video_transcript**: Extract video transcripts
- **answer_followup_question**: Ask questions about analyzed videos
- **get_usage**: Check API usage and subscription limits
- **transcribe_video**: Transcribe non-YouTube videos

## 📁 Files in this Directory

- [`vidnavigator.agent`](./vidnavigator.agent) – Preconfigured agent for enhanced experience
- [`settings.json.example`](./settings.json.example) – Example MCP server configuration

## 🔧 Troubleshooting

### Tools Not Available
- Verify your API key is configured correctly in the MCP settings
- Check that your API key starts with `vna_`
- Restart Cursor after configuration changes

### API Errors
- Ensure your API key is valid and active
- Check if you've exceeded your usage limits with the `get_usage` tool
- Verify your internet connection

### Configuration Issues
- Make sure the JSON configuration is valid (no trailing commas, proper quotes)
- Verify the URL is exactly: `https://api.vidnavigator.com/mcp/`
- Ensure the Authorization header format is: `Bearer YOUR_API_KEY_HERE`

## 📊 Rate Limits

Your usage is limited by your [VidNavigator](https://vidnavigator.com) subscription plan:
- **Free Plan**: Limited requests per month
- **Paid Plans**: Higher limits based on plan tier

Use the "Show my current VidNavigator API usage" command to check your limits.

## 🆘 Need Help?

- **Documentation**: [https://docs.vidnavigator.com](https://docs.vidnavigator.com)
- **Support**: [support@vidnavigator.com](mailto:support@vidnavigator.com)
- **Issues**: [GitHub Issues](https://github.com/vidnavigator/vidnavigator-mcp-starter/issues)

---

[← Back to Main Project](../README.md)