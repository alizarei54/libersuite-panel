#!/bin/bash

# Libersuite Panel - Push to GitHub
# پنل مدیریتی - ارسال به GitHub

set -e

echo "╔════════════════════════════════════════════════╗"
echo "║  Libersuite Panel - GitHub Push               ║"
echo "║  ارسال تغییرات به GitHub                     ║"
echo "╚════════════════════════════════════════════════╝"
echo ""

# Check if in git repository
if [ ! -d ".git" ]; then
    echo "❌ Not a git repository"
    exit 1
fi

# Show current status
echo "📊 Git Status:"
git status --short | head -20 || echo "   No changes"
echo ""

# Get commit message
read -p "📝 Enter commit message: " COMMIT_MSG

if [ -z "$COMMIT_MSG" ]; then
    echo "❌ Commit message cannot be empty"
    exit 1
fi

# Add all changes
echo "📦 Staging changes..."
git add .

# Commit
echo "💾 Creating commit..."
git commit -m "$COMMIT_MSG" || {
    echo "⚠️  Nothing to commit"
}

# Get branch name
BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Push
echo "📤 Pushing to GitHub ($BRANCH)..."
git push origin "$BRANCH" || {
    echo ""
    echo "❌ Push failed!"
    echo ""
    echo "If you haven't set up remote yet, run:"
    echo "  ./setup-github.sh"
    exit 1
}

echo ""
echo "✅ Push successful!"
echo ""
echo "🌐 View on GitHub:"
ORIGIN=$(git config --get remote.origin.url | sed 's/.git$//')
echo "   $ORIGIN"
echo ""
