#!/usr/bin/env node
/**
 * Build script for VidNavigator MCP Server
 * 
 * Builds extensions for both Cursor and Claude Desktop platforms.
 */

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs/promises';

const CLAUDE_DESKTOP_DIR = 'claude-desktop';
const RELEASES_DIR = 'releases';

async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function buildClaudeDesktop() {
  console.log('🏗️  Building Claude Desktop extension...');
  
  const claudeDir = path.resolve(CLAUDE_DESKTOP_DIR);
  
  try {
    // Build the extension
    execSync('npm ci', { 
      stdio: 'inherit', 
      cwd: claudeDir 
    });
    
    execSync('npm run build', { 
      stdio: 'inherit', 
      cwd: claudeDir 
    });
    
    // Copy to releases directory
    await ensureDir(RELEASES_DIR);
    const sourcePath = path.join(claudeDir, 'dist', 'vidnavigator.dxt');
    const destPath = path.join(RELEASES_DIR, 'vidnavigator.dxt');
    
    await fs.copyFile(sourcePath, destPath);
    
    console.log('✅ Claude Desktop extension built successfully');
    console.log(`📁 Output: ${destPath}`);
    
  } catch (error) {
    console.error('❌ Failed to build Claude Desktop extension:', error.message);
    throw error;
  }
}

async function main() {
  console.log('🚀 Building VidNavigator MCP Server for all platforms...\n');
  
  try {
    await buildClaudeDesktop();
    
    console.log('\n🎉 All builds completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Test the Claude Desktop extension by installing releases/vidnavigator.dxt');
    console.log('2. For releases, create a GitHub tag to trigger automated release');
    console.log('3. Cursor setup requires no build - users configure directly via MCP settings');
    
  } catch (error) {
    console.error('\n❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Check if running as main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}