# Building VidNavigator Desktop Extension

This guide explains how to build and package the VidNavigator Desktop Extension (.dxt file) for distribution to Claude Desktop users.

## Prerequisites

1. **Node.js 18+**: Required for building the extension
2. **npm**: For managing dependencies
3. **@anthropic-ai/dxt CLI** (optional): For advanced validation and packaging

## Quick Build

### Using the Build Script (Recommended)

```bash
# Navigate to the extension directory
cd backend/protocols/desktop-extension

# Install dependencies and build
npm install
npm run build
```

This will create `dist/vidnavigator.dxt` ready for distribution.

### Using Anthropic's DXT CLI

If you have the official DXT CLI installed:

```bash
# Install DXT CLI (one-time setup)
npm install -g @anthropic-ai/dxt

# Build the extension
dxt pack
```

## Manual Build Process

If you prefer to build manually or understand the process:

### 1. Install Dependencies

```bash
cd backend/protocols/desktop-extension
npm install --production
```

### 2. Validate Manifest

Ensure your `manifest.json` is valid:

```bash
# Using DXT CLI (if available)
dxt validate

# Or manually check JSON syntax
node -e "console.log('Valid JSON:', JSON.parse(require('fs').readFileSync('manifest.json', 'utf8')).name)"
```

### 3. Create ZIP Archive

The .dxt file is actually a ZIP archive with specific structure:

```bash
# Create the archive (Windows PowerShell)
Compress-Archive -Path manifest.json,README.md,package.json,icon.png,server,node_modules -DestinationPath vidnavigator.dxt

# Or using 7-Zip (if installed)
7z a vidnavigator.dxt manifest.json README.md package.json icon.png server/ node_modules/

# Or on Unix/Linux/macOS
zip -r vidnavigator.dxt manifest.json README.md package.json icon.png server/ node_modules/
```

## File Structure

The final .dxt file should contain:

```
vidnavigator.dxt (ZIP archive)
├── manifest.json         # Extension metadata and configuration
├── README.md            # User documentation
├── package.json         # Node.js package information
├── icon.png             # Extension icon (128x128px recommended)
├── server/              # MCP server implementation
│   └── index.js         # Main server entry point
├── node_modules/        # Production dependencies
│   └── @modelcontextprotocol/
└── assets/              # Optional: screenshots and additional assets
    └── screenshots/
```

## Build Configuration

### Environment Variables

You can customize the build process with environment variables:

```bash
# Custom output directory
BUILD_DIR=./custom-dist npm run build

# Include development dependencies (not recommended for production)
NODE_ENV=development npm run build
```

### Manifest Customization

Before building, you may want to customize the `manifest.json`:

- **Version**: Update the version number for each release
- **API Base URL**: Change the default API endpoint if needed
- **User Config**: Modify the configuration fields users see

## Testing the Extension

### Local Testing

1. **Build the extension**:
   ```bash
   npm run build
   ```

2. **Install in Claude Desktop**:
   - Open Claude Desktop
   - Go to Settings > Extensions
   - Click "Install from file"
   - Select `dist/vidnavigator.dxt`

3. **Configure API Key**:
   - Enter your VidNavigator API key
   - Test with a simple command: "Search for videos about AI"

### Validation Checklist

Before distributing, verify:

- [ ] Extension installs without errors
- [ ] All tools appear in Claude Desktop
- [ ] API key configuration works
- [ ] Network requests to VidNavigator API succeed
- [ ] Error handling works properly
- [ ] Extension can be uninstalled cleanly

## Distribution

### Version Management

1. **Update Version**: Increment version in `manifest.json`
2. **Tag Release**: Create a git tag for the release
3. **Build**: Create the .dxt file
4. **Test**: Verify the extension works
5. **Distribute**: Upload to your distribution channel

### Release Checklist

- [ ] Version number updated in manifest.json
- [ ] Release notes prepared
- [ ] Extension tested on Windows and macOS
- [ ] .dxt file size is reasonable (< 10MB recommended)
- [ ] All dependencies are properly included
- [ ] No development dependencies in production build

## Troubleshooting

### Common Build Issues

**1. Missing Dependencies**
```bash
# Solution: Install all dependencies
npm install
```

**2. Invalid Manifest**
```bash
# Solution: Validate JSON syntax
node -e "JSON.parse(require('fs').readFileSync('manifest.json', 'utf8'))"
```

**3. Large File Size**
```bash
# Solution: Remove unnecessary files
npm prune --production
```

**4. Permission Errors**
```bash
# Solution: Check file permissions
chmod +x build.js
```

### Build Script Issues

If the build script fails:

1. **Check Node.js version**: `node --version` (should be 18+)
2. **Verify dependencies**: `npm list`
3. **Clean and rebuild**: `rm -rf node_modules && npm install`
4. **Check disk space**: Ensure sufficient space for build artifacts

### Extension Installation Issues

**Extension won't install in Claude Desktop:**
- Verify .dxt file is not corrupted
- Check Claude Desktop version compatibility
- Ensure file size is under Claude's limits

**Extension installs but tools don't work:**
- Verify manifest.json tool definitions
- Check server/index.js syntax
- Test API connectivity manually

## Advanced Options

### Custom Packaging

For advanced users who want to customize the packaging:

```bash
# Install archiver for custom packaging
npm install archiver

# Use the build script as a template
node build.js
```

### Signing (Future)

When Anthropic releases signing capabilities:

```bash
# Sign the extension (when available)
dxt sign vidnavigator.dxt --key your-signing-key
```

### Publishing to Directory

To submit to the official Claude Desktop extension directory:

1. Follow Anthropic's submission guidelines
2. Ensure extension meets quality standards
3. Submit via the official process
4. Wait for review and approval

## Security Considerations

- **Dependencies**: Only include necessary production dependencies
- **API Keys**: Never hardcode API keys in the extension
- **Validation**: Validate all user inputs
- **HTTPS**: Always use HTTPS for API calls
- **Error Handling**: Don't expose sensitive information in errors

## License and Legal

- Ensure all dependencies are compatible with your license
- Include proper attribution for third-party code
- Respect rate limits and terms of service
- Consider privacy implications of data processing