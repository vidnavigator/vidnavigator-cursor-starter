#!/usr/bin/env node
/**
 * Build script for VidNavigator Desktop Extension
 * 
 * This script packages the extension into a .dxt file for distribution.
 */

import fs from 'fs/promises';
import { createWriteStream } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import archiver from 'archiver';

const EXTENSION_DIR = process.cwd();
const DIST_DIR = path.join(EXTENSION_DIR, 'dist');
const OUTPUT_FILE = path.join(DIST_DIR, 'vidnavigator.dxt');

async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function installDependencies() {
  console.log('📦 Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit', cwd: EXTENSION_DIR });
    console.log('✅ Dependencies installed successfully');
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    process.exit(1);
  }
}

async function validateManifest() {
  console.log('🔍 Validating manifest.json...');
  try {
    const manifestPath = path.join(EXTENSION_DIR, 'manifest.json');
    const manifestContent = await fs.readFile(manifestPath, 'utf8');
    const manifest = JSON.parse(manifestContent);
    
    // Basic validation
    if (!manifest.name || !manifest.version || !manifest.server) {
      throw new Error('Missing required manifest fields');
    }
    
    console.log(`✅ Manifest valid - ${manifest.name} v${manifest.version}`);
    return manifest;
  } catch (error) {
    console.error('❌ Manifest validation failed:', error.message);
    process.exit(1);
  }
}

async function createDxtFile(manifest) {
  console.log('📦 Creating .dxt file...');
  
  await ensureDir(DIST_DIR);
  
  // Remove existing output file if it exists
  try {
    await fs.unlink(OUTPUT_FILE);
  } catch {
    // File doesn't exist, that's fine
  }
  
  return new Promise((resolve, reject) => {
    const output = createWriteStream(OUTPUT_FILE);
    const archive = archiver('zip', {
      zlib: { level: 9 } // Maximum compression
    });
    
    output.on('close', () => {
      const sizeKB = (archive.pointer() / 1024).toFixed(2);
      console.log(`✅ Extension packaged: ${OUTPUT_FILE} (${sizeKB} KB)`);
      resolve();
    });
    
    archive.on('error', (err) => {
      console.error('❌ Archiving failed:', err.message);
      reject(err);
    });
    
    archive.pipe(output);
    
    // Add all files to the archive
    archive.file('manifest.json', { name: 'manifest.json' });
    archive.file('README.md', { name: 'README.md' });
    archive.file('package.json', { name: 'package.json' });
    archive.file('icon.png', { name: 'icon.png' });
    
    // Add server directory
    archive.directory('server/', 'server/');
    
    // Add node_modules (production dependencies only)
    archive.directory('node_modules/', 'node_modules/');
    
    // Add assets if they exist
    try {
      archive.directory('assets/', 'assets/');
    } catch {
      // Assets directory doesn't exist, skip
    }
    
    archive.finalize();
  });
}

async function main() {
  console.log('🚀 Building VidNavigator Desktop Extension...\n');
  
  try {
    const manifest = await validateManifest();
    await installDependencies();
    await createDxtFile(manifest);
    
    console.log('\n🎉 Build completed successfully!');
    console.log(`📁 Output: ${OUTPUT_FILE}`);
    console.log('\n📋 Next steps:');
    console.log('1. Test the extension by installing it in Claude Desktop');
    console.log('2. Upload to your distribution channel');
    console.log('3. Update version in manifest.json for next release');
    
  } catch (error) {
    console.error('\n❌ Build failed:', error.message);
    process.exit(1);
  }
}

main();