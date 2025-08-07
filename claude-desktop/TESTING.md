# VidNavigator Desktop Extension - Testing Guide

This guide provides comprehensive testing procedures for the VidNavigator Desktop Extension to ensure quality and reliability before distribution.

## Testing Environment Setup

### Prerequisites

1. **Claude Desktop**: Latest version installed
2. **VidNavigator API Key**: Valid API key for testing
3. **Test Videos**: Prepare test URLs from various platforms
4. **Network Access**: Stable internet connection

### Test Data Preparation

Create a test dataset with these video types:

```json
{
  "test_videos": {
    "youtube": [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "https://www.youtube.com/watch?v=jNQXAC9IVRw",
      "https://www.youtube.com/watch?v=9bZkp7q19f0"
    ],
    "short_videos": [
      "https://www.youtube.com/shorts/xyz123"
    ],
    "social_media": [
      "https://www.instagram.com/reel/C86ZvEaqRmo/",
      "https://www.tiktok.com/@user/video/123456789"
    ],
    "long_videos": [
      "https://www.youtube.com/watch?v=LONG_VIDEO_ID"
    ]
  }
}
```

## Testing Checklist

### 🏗️ Installation Testing

- [ ] **Extension Installation**
  - [ ] Installs without errors from .dxt file
  - [ ] Appears in Extensions list
  - [ ] Icon displays correctly
  - [ ] Version number matches manifest

- [ ] **Configuration**
  - [ ] API key field accepts valid keys
  - [ ] API key field validates format (starts with 'vna_')
  - [ ] Invalid API keys show appropriate error
  - [ ] API base URL can be customized
  - [ ] Settings save and persist

- [ ] **Extension Status**
  - [ ] Shows as "Active" when configured
  - [ ] Shows as "Disabled" when unconfigured
  - [ ] Tools become available when activated

### 🔧 Functionality Testing

#### Search Videos Tool

Test the `search_videos` tool with various queries:

```bash
# Basic search
Test: "Search for videos about machine learning"
Expected: Returns relevant video results with titles, URLs, descriptions

# Year filtering
Test: "Search for React tutorials from 2023"
Expected: Returns videos filtered by year

# Focus parameter
Test: "Search for popular Python videos"
Expected: Returns videos ranked by popularity

# Complex queries
Test: "Find videos about advanced JavaScript concepts for experienced developers"
Expected: Returns relevant advanced content
```

**Test Cases:**
- [ ] Basic text queries work
- [ ] Year filtering (start_year, end_year) works
- [ ] Focus parameter (relevance, popularity, brevity) works
- [ ] Complex natural language queries work
- [ ] Empty queries handle gracefully
- [ ] Special characters in queries work
- [ ] Non-English queries work (if supported)

#### Analyze Video Tool

Test the `analyze_video` tool:

```bash
# Basic analysis
Test: "Analyze this video: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
Expected: Returns video info, summary, people, places, key subjects

# Question-based analysis
Test: "What is the main topic of this video: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
Expected: Returns specific answer to the question

# Long video analysis
Test: "Analyze this 1-hour lecture: [LONG_VIDEO_URL]"
Expected: Handles long content appropriately
```

**Test Cases:**
- [ ] Standard YouTube URLs work
- [ ] YouTube shorts work
- [ ] Private/restricted videos handle gracefully
- [ ] Invalid URLs show appropriate errors
- [ ] Question-based analysis works
- [ ] Summary analysis works
- [ ] Returns proper video metadata
- [ ] Handles videos in different languages

#### Get Video Transcript Tool

Test the `get_video_transcript` tool:

```bash
Test: "Get transcript for: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
Expected: Returns structured transcript with timestamps
```

**Test Cases:**
- [ ] Returns complete transcript
- [ ] Includes timestamps
- [ ] Handles videos without transcripts gracefully
- [ ] Works with auto-generated transcripts
- [ ] Works with manual transcripts
- [ ] Handles multiple languages

#### Answer Followup Question Tool

Test the `answer_followup_question` tool:

```bash
# First analyze a video, then ask followup
Step 1: "Analyze this video: [VIDEO_URL]"
Step 2: "What specific technologies were mentioned in the video?"
Expected: Returns specific answer based on previous analysis
```

**Test Cases:**
- [ ] Works with previously analyzed videos
- [ ] Returns relevant answers
- [ ] Handles questions about non-analyzed videos
- [ ] Works with different question types
- [ ] References specific video segments

#### Get Usage Tool

Test the `get_usage` tool:

```bash
Test: "Show my current API usage"
Expected: Returns usage statistics and limits
```

**Test Cases:**
- [ ] Returns current usage numbers
- [ ] Shows remaining limits
- [ ] Displays subscription information
- [ ] Updates in real-time

#### Transcribe Video Tool

Test the `transcribe_video` tool:

```bash
# Instagram video
Test: "Transcribe this Instagram video: [INSTAGRAM_URL]"
Expected: Returns transcribed content

# TikTok video
Test: "Transcribe this TikTok: [TIKTOK_URL]"
Expected: Returns transcribed content with language detection
```

**Test Cases:**
- [ ] Instagram videos work
- [ ] TikTok videos work
- [ ] Facebook videos work
- [ ] Twitter videos work
- [ ] Language parameter works
- [ ] Auto-detects language when not specified
- [ ] Handles videos without audio

### ⚡ Performance Testing

- [ ] **Response Times**
  - [ ] Search completes within 10 seconds
  - [ ] Video analysis completes within 60 seconds
  - [ ] Transcript extraction completes within 30 seconds
  - [ ] Usage queries complete within 5 seconds

- [ ] **Concurrency**
  - [ ] Multiple requests can be made simultaneously
  - [ ] Extension doesn't crash under load
  - [ ] Memory usage remains stable

- [ ] **Large Content**
  - [ ] Handles 2+ hour videos
  - [ ] Processes high-quality videos
  - [ ] Manages large transcript files

### 🛡️ Error Handling Testing

#### API Key Errors
- [ ] Missing API key shows helpful error
- [ ] Invalid API key format shows validation error
- [ ] Expired API key shows renewal message
- [ ] Rate limit exceeded shows clear message

#### Network Errors
- [ ] No internet connection handled gracefully
- [ ] API server downtime handled properly
- [ ] Timeout errors show appropriate message
- [ ] Slow connections don't crash extension

#### Invalid Input Errors
- [ ] Invalid video URLs show clear errors
- [ ] Unsupported video platforms handled
- [ ] Malformed queries handled gracefully
- [ ] Empty parameters validated

#### Edge Cases
- [ ] Very long video URLs work
- [ ] Special characters in URLs handled
- [ ] Non-video URLs rejected appropriately
- [ ] Playlist URLs handled or rejected clearly

### 🔒 Security Testing

- [ ] **API Key Storage**
  - [ ] API key stored in system keychain
  - [ ] API key not visible in logs
  - [ ] API key not transmitted unnecessarily

- [ ] **Input Validation**
  - [ ] URLs properly validated
  - [ ] Injection attacks prevented
  - [ ] Malicious input handled safely

- [ ] **Network Security**
  - [ ] All API calls use HTTPS
  - [ ] No sensitive data in URL parameters
  - [ ] Proper authentication headers

### 🖥️ Cross-Platform Testing

#### Windows Testing
- [ ] Extension installs on Windows 10
- [ ] Extension installs on Windows 11
- [ ] All tools work properly
- [ ] No Windows-specific errors

#### macOS Testing
- [ ] Extension installs on macOS 11+
- [ ] Keychain integration works
- [ ] All tools work properly
- [ ] No macOS-specific errors

#### Linux Testing (if supported)
- [ ] Extension installs on supported Linux distros
- [ ] Secret storage works
- [ ] All tools work properly

### 📱 User Experience Testing

- [ ] **Installation Flow**
  - [ ] Installation instructions are clear
  - [ ] Configuration process is intuitive
  - [ ] Error messages are helpful
  - [ ] Success states are obvious

- [ ] **Usage Flow**
  - [ ] Tools are discoverable
  - [ ] Commands work as expected
  - [ ] Results are well-formatted
  - [ ] Loading states are clear

- [ ] **Error Recovery**
  - [ ] Users can recover from errors
  - [ ] Help information is accessible
  - [ ] Troubleshooting steps work

## Automated Testing Scripts

### Basic Functionality Test

```bash
#!/bin/bash
# basic-test.sh - Run basic functionality tests

echo "Testing VidNavigator Extension..."

# Test 1: Search Videos
echo "Test 1: Video Search"
echo "Command: Search for videos about 'AI tutorials'"
# Run in Claude and verify results

# Test 2: Analyze Video
echo "Test 2: Video Analysis"
echo "Command: Analyze https://www.youtube.com/watch?v=dQw4w9WgXcQ"
# Run in Claude and verify results

# Test 3: Get Usage
echo "Test 3: Usage Check"
echo "Command: Show my API usage"
# Run in Claude and verify results

echo "Basic tests completed."
```

### Load Testing

```javascript
// load-test.js - Simple load testing
const tests = [
  'search_videos',
  'analyze_video', 
  'get_video_transcript',
  'get_usage'
];

console.log('Running load tests...');
// Implement concurrent requests to test extension stability
```

## Test Reporting

### Test Results Template

```markdown
# VidNavigator Extension Test Report

**Date**: [DATE]
**Version**: [VERSION]
**Tester**: [NAME]
**Environment**: [OS/CLAUDE_VERSION]

## Summary
- Total Tests: [NUMBER]
- Passed: [NUMBER]
- Failed: [NUMBER]
- Skipped: [NUMBER]

## Detailed Results

### Installation Testing
- ✅ Extension installation: PASS
- ✅ Configuration: PASS
- ❌ API key validation: FAIL - [Details]

### Functionality Testing
[Detailed results for each tool]

### Performance Testing
[Response time measurements]

### Error Handling
[Error scenarios tested]

## Issues Found
1. [Issue description]
   - Severity: High/Medium/Low
   - Steps to reproduce
   - Expected vs actual behavior

## Recommendations
[Suggestions for improvements]
```

## Release Testing Checklist

Before each release:

- [ ] All automated tests pass
- [ ] Manual testing completed
- [ ] Cross-platform testing done
- [ ] Performance benchmarks met
- [ ] Security review completed
- [ ] Documentation updated
- [ ] Known issues documented

## Testing Tools

### Recommended Testing Environment

1. **Multiple Claude Desktop Versions**
   - Latest stable
   - Previous stable (if available)
   - Beta versions (if testing new features)

2. **Multiple Operating Systems**
   - Windows 10/11
   - macOS 11+
   - Linux (Ubuntu/Debian if supported)

3. **Network Conditions**
   - High-speed connection
   - Slow connection simulation
   - Intermittent connectivity

### Testing Utilities

- **Browser DevTools**: For inspecting network requests
- **Wireshark**: For detailed network analysis
- **Performance Monitors**: For system resource usage
- **Log Viewers**: For extension and system logs

## Continuous Testing

### Regression Testing
- Run full test suite before each release
- Test with latest Claude Desktop updates
- Verify backward compatibility

### User Acceptance Testing
- Beta testing with select users
- Feedback collection and analysis
- Issue tracking and resolution

### Monitoring
- API usage patterns
- Error rates and types
- Performance metrics
- User feedback

---

**Questions or Issues?** Contact the development team or create an issue in the repository.