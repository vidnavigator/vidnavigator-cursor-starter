# 🎥 VidNavigator for Claude Desktop

AI-powered video search, analysis, and transcription extension for [Claude Desktop](https://claude.ai/desktop).

## 🚀 Features

- **🔍 AI Video Search**: Search for videos using natural language with advanced AI analysis and relevance ranking
- **📽️ Video Analysis**: Comprehensive analysis of YouTube videos with summaries, key insights, and Q&A
- **📝 Transcript Extraction**: Get YouTube video transcripts without analysis (fast and lightweight)
- **🎬 Multi-Platform Transcription**: Transcribe videos from Instagram, TikTok, Facebook, and other social platforms
- **💬 Follow-up Questions**: Ask specific questions about previously analyzed videos
- **📊 Usage Tracking**: Monitor your API usage and subscription limits

## ⚡ Quick Installation

### Option 1: Download Pre-built Extension (Recommended)
1. **📥 [Download Latest Extension (.dxt)](https://github.com/vidnavigator/vidnavigator-mcp-starter/releases/latest)**
2. Open **Claude Desktop**
3. Go to **Settings** → **Extensions**
4. Click **"Install from file"** and select the downloaded `.dxt` file

### Option 2: Build from Source
```bash
git clone https://github.com/vidnavigator/vidnavigator-mcp-starter.git
cd vidnavigator-mcp-starter/claude-desktop
npm install
npm run build
```
Install the generated `dist/vidnavigator.dxt` file in Claude Desktop.

## Configuration

After installation, you'll need to configure your VidNavigator API key:

1. **Get an API Key**:
   - Sign up at [https://vidnavigator.com](https://vidnavigator.com)
   - Go to your profile and create an API key
   - Copy the API key (starts with `vna_`)

2. **Configure the Extension**:
   - Open Claude Desktop Settings > Extensions
   - Find "VidNavigator" and click "Configure"
   - Enter your API key in the "VidNavigator API Key" field
   - Click "Save"

## Usage

Once installed and configured, you can use VidNavigator tools in your Claude conversations:

### Search for Videos
```
Search for videos about "React best practices 2024"
```

### Analyze a Video
```
Analyze this video: https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

### Get Video Transcript
```
Get the transcript for: https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

### Transcribe Non-YouTube Videos
```
Transcribe this Instagram video: https://www.instagram.com/reel/C86ZvEaqRmo/
```

### Ask Follow-up Questions
```
What are the main points discussed in this video: https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

### Check Usage
```
Show my current API usage and limits
```

## Available Tools

- **search_videos**: Search for videos with AI analysis and ranking
- **analyze_video**: Analyze video content and generate summaries
- **get_video_transcript**: Extract video transcripts
- **answer_followup_question**: Ask questions about analyzed videos
- **get_usage**: Check API usage and subscription limits
- **transcribe_video**: Transcribe non-YouTube videos

## API Rate Limits

All tools are subject to your VidNavigator subscription plan limits:
- **Free Plan**: Limited requests per month
- **Paid Plans**: Higher limits based on plan tier

Use the "get_usage" tool to check your current usage and remaining limits.

## Troubleshooting

### Extension Won't Install
- Ensure you're running the latest version of Claude Desktop
- Check that you have sufficient disk space
- Try restarting Claude Desktop

### Tools Not Available
- Verify your API key is configured correctly
- Check your internet connection
- Ensure your subscription is active

### API Errors
- Verify your API key starts with `vna_`
- Check if you've exceeded your usage limits
- Try again in a few moments if you see rate limit errors

## Support

- **Website**: [https://vidnavigator.com](https://vidnavigator.com)
- **Documentation**: [https://docs.vidnavigator.com](https://docs.vidnavigator.com)
- **Issues**: [GitHub Issues](https://github.com/vidnavigator/vidnavigator-mcp-starter/issues)
- **Email**: support@vidnavigator.com

## Privacy & Security

- Your API key is stored securely in your system's keychain
- All video analysis is performed server-side
- No video content is stored permanently
- All communications are encrypted in transit

## 📄 License

MIT License - see [LICENSE](../LICENSE) file for details.

---

[← Back to Main Project](../README.md) | Made with ❤️ by the [VidNavigator](https://vidnavigator.com) team