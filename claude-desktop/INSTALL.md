# VidNavigator Desktop Extension - Installation Guide

This guide helps users install and configure the VidNavigator Desktop Extension for Claude Desktop.

## System Requirements

- **Claude Desktop**: Latest version (1.0.0 or higher)
- **Operating System**: Windows 10+, macOS 11+, or Linux
- **Internet Connection**: Required for API calls
- **VidNavigator Account**: Sign up at [vidnavigator.com](https://vidnavigator.com)

## Installation Method

1. **Download the Extension**:
   - Get the latest `vidnavigator.dxt` file from our releases
   - Save it to your Downloads folder or preferred location

2. **Open Claude Desktop**:
   - Launch Claude Desktop application

3. **Install the Extension**:
   - Go to Settings > Extensions
   - Click "Install from file" or drag the .dxt file into the window
   - Select the downloaded `vidnavigator.dxt` file
   - Click "Open" or "Install"

4. **Wait for Installation**:
   - Claude Desktop will validate and install the extension
   - This may take a few moments

## Configuration

After installation, you need to configure your API key:

### Step 1: Get Your API Key

1. **Sign up at VidNavigator**:
   - Visit [https://vidnavigator.com](https://vidnavigator.com)
   - Create an account or sign in

2. **Generate API Key**:
   - Go to your profile/dashboard
   - Look for "API Keys" or "Developer" section
   - Click "Create New API Key"
   - Give it a name (e.g., "Claude Desktop Extension")
   - Copy the generated key (starts with `vna_`)

### Step 2: Configure the Extension

1. **Open Extension Settings**:
   - In Claude Desktop, go to Settings > Extensions
   - Find "VidNavigator" in your installed extensions
   - Click "Configure" or the gear icon

2. **Enter API Key**:
   - Paste your API key in the "VidNavigator API Key" field
   - Ensure it starts with `vna_`

3. **Save Configuration**:
   - Click "Save" or "Apply"
   - The extension status should change to "Active"

## Verification

Test that the extension is working:

1. **Start a New Conversation**:
   - Create a new chat in Claude Desktop

2. **Test a Simple Command**:
   ```
   Search for videos about "machine learning tutorials"
   ```

3. **Check for Results**:
   - You should see video search results
   - If you get an error, check your API key configuration

## Usage Examples

Once installed and configured, try these commands:

### Video Search
```
Find videos about React best practices from 2023
```

### Video Analysis
```
Analyze this video: https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

### Get Transcript
```
Get the transcript for: https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

### Transcribe Social Media Videos
```
Transcribe this Instagram video: https://www.instagram.com/reel/C86ZvEaqRmo/
```

### Check Usage
```
Show my current API usage and limits
```

## Troubleshooting

### Extension Won't Install

**Issue**: "Installation failed" or "Invalid extension file"
**Solutions**:
- Ensure you're using the latest version of Claude Desktop
- Re-download the .dxt file (it may be corrupted)
- Check that you have sufficient disk space
- Try restarting Claude Desktop

**Issue**: "Extension format not supported"
**Solutions**:
- Update Claude Desktop to the latest version
- Verify the file extension is `.dxt`
- Contact support if the issue persists

### Extension Installed but Not Working

**Issue**: Extension appears in settings but tools aren't available
**Solutions**:
- Restart Claude Desktop completely (quit and reopen)
- Check the extension configuration
- Verify your API key is entered correctly
- Ensure your internet connection is working

**Issue**: "API key required" errors
**Solutions**:
- Go to Settings > Extensions > VidNavigator > Configure
- Re-enter your API key
- Ensure the key starts with `vna_`
- Verify your VidNavigator account is active

### API Errors

**Issue**: "Unauthorized" or "Invalid API key"
**Solutions**:
- Double-check your API key in the extension settings
- Ensure you copied the full key including the `vna_` prefix
- Verify your VidNavigator account is in good standing
- Try regenerating your API key

**Issue**: "Rate limit exceeded"
**Solutions**:
- Wait a few minutes before trying again
- Check your usage limits with: "Show my current API usage"
- Consider upgrading your VidNavigator plan
- Spread out your requests over time

**Issue**: "Network error" or "Connection failed"
**Solutions**:
- Check your internet connection
- Verify you can access vidnavigator.com in your browser
- Check if your firewall is blocking the connection
- Try again in a few minutes

### Performance Issues

**Issue**: Slow responses or timeouts
**Solutions**:
- Large video analysis can take 30-60 seconds
- Check your internet connection speed
- Try with shorter videos first
- Contact support if consistently slow

## Getting Help

### Documentation
- **Main Website**: [https://vidnavigator.com](https://vidnavigator.com)
- **API Documentation**: [https://docs.vidnavigator.com](https://docs.vidnavigator.com)
- **Extension Guide**: This document

### Support Channels
- **Email**: support@vidnavigator.com
- **GitHub Issues**: [https://github.com/vidnavigator/vidnavigator-mcp-starter/issues](https://github.com/vidnavigator/vidnavigator-mcp-starter/issues)
- **Community**: VidNavigator Discord server (link on website)

### Before Contacting Support

Please provide:
1. Your operating system and version
2. Claude Desktop version
3. Extension version (check in Settings > Extensions)
4. Error messages (exact text)
5. Steps to reproduce the issue
6. Screenshots if relevant

## Privacy and Security

- **API Key Storage**: Your API key is stored securely in your system's keychain
- **Data Processing**: Video analysis is performed server-side
- **No Storage**: No video content is permanently stored
- **Encryption**: All API communications use HTTPS
- **Local Operation**: The extension runs locally on your machine

## Uninstalling

To remove the extension:

1. **Open Settings**: Go to Claude Desktop Settings > Extensions
2. **Find VidNavigator**: Locate the extension in your list
3. **Uninstall**: Click "Uninstall" or the trash icon
4. **Confirm**: Confirm the removal when prompted
5. **Restart**: Restart Claude Desktop to complete removal

Your API key will be automatically removed from the keychain during uninstallation.

## Updating

### Automatic Updates (Directory Extensions)
- Extensions from the official directory update automatically
- You'll see a notification when updates are available
- Updates typically include bug fixes and new features

### Manual Updates (.dxt Files)
- Download the latest .dxt file
- Uninstall the old version
- Install the new version
- Reconfigure your API key if needed

---

**Need more help?** Visit [vidnavigator.com/support](https://vidnavigator.com/support) or email support@vidnavigator.com