# VidNavigator Desktop Extension Makefile

.PHONY: help install build package clean test validate

# Default target
help:
	@echo "VidNavigator Desktop Extension Build System"
	@echo ""
	@echo "Available targets:"
	@echo "  install    - Install dependencies"
	@echo "  build      - Build the .dxt extension file"
	@echo "  package    - Alias for build"
	@echo "  validate   - Validate manifest.json"
	@echo "  clean      - Clean build artifacts"
	@echo "  test       - Run tests (if available)"
	@echo "  help       - Show this help message"

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	npm install

# Build the extension
build: install validate
	@echo "🏗️ Building VidNavigator Desktop Extension..."
	npm run build
	@echo "✅ Build completed: dist/vidnavigator.dxt"

# Alias for build
package: build

# Validate manifest.json
validate:
	@echo "🔍 Validating manifest.json..."
	@node -e "const fs = require('fs'); const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8')); console.log('✅ Manifest valid:', manifest.name, 'v' + manifest.version);" || (echo "❌ Invalid manifest.json" && exit 1)

# Clean build artifacts
clean:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf dist/
	rm -rf node_modules/
	@echo "✅ Clean completed"

# Run tests
test:
	@echo "🧪 Running tests..."
	@echo "Manual testing required - see TESTING.md"
	@echo "TODO: Implement automated tests"

# Development setup
dev-setup: install
	@echo "🔧 Setting up development environment..."
	@echo "✅ Development setup completed"
	@echo ""
	@echo "Next steps:"
	@echo "1. Configure your API key in the extension"
	@echo "2. Run 'make build' to create the .dxt file"
	@echo "3. Install the .dxt file in Claude Desktop"

# Quick test build (no validation)
quick-build:
	@echo "⚡ Quick build (no validation)..."
	npm run build

# Show file structure
structure:
	@echo "📁 Extension file structure:"
	@find . -type f -name "*.json" -o -name "*.js" -o -name "*.md" -o -name "*.png" | grep -v node_modules | sort