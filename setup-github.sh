#!/bin/bash

# Libersuite Panel - GitHub Push Setup
# پنل مدیریتی - راه‌اندازی GitHub

set -e

echo "╔════════════════════════════════════════════════╗"
echo "║  Libersuite Panel - GitHub Push Setup         ║"
echo "║  راه‌اندازی Push به GitHub                   ║"
echo "╚════════════════════════════════════════════════╝"
echo ""

USERNAME="${1:-alizarei54}"
REPO_NAME="${2:-libersuite-panel}"
REPO_URL="https://github.com/$USERNAME/$REPO_NAME"

# Check git
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed"
    exit 1
fi

echo "📋 Configuration:"
echo "   GitHub User: $USERNAME"
echo "   Repository: $REPO_NAME"
echo "   URL: $REPO_URL"
echo ""

# Verify we're in git repository
if [ ! -d ".git" ]; then
    echo "❌ Not a git repository. Please run this script from project root."
    exit 1
fi

# Create remote if it doesn't exist
echo "🔗 Setting up GitHub remote..."

if git remote | grep -q "^origin$"; then
    echo "   ⚠️  Remote 'origin' already exists"
    echo "   Updating remote URL..."
    git remote set-url origin "https://github.com/$USERNAME/$REPO_NAME.git"
else
    echo "   Adding new remote..."
    git remote add origin "https://github.com/$USERNAME/$REPO_NAME.git"
fi

echo ""
echo "📤 Repository configuration:"
git remote -v
echo ""

# Configure git user if needed
if [ -z "$(git config user.name)" ]; then
    echo "🔐 Git user not configured"
    read -p "Enter your git user name: " GIT_USER
    git config --global user.name "$GIT_USER"
fi

if [ -z "$(git config user.email)" ]; then
    read -p "Enter your git email: " GIT_EMAIL
    git config --global user.email "$GIT_EMAIL"
fi

echo ""
echo "✅ Configuration complete!"
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Make sure your GitHub token is configured:"
echo "   • For HTTPS: Use Personal Access Token"
echo "   • For SSH: Configure SSH keys"
echo ""
echo "2. Push to GitHub:"
echo "   git push -u origin main"
echo ""
echo "3. Or use the push.sh script:"
echo "   ./push.sh"
echo ""

# Optional: Show push command
read -p "Do you want to push now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📤 Pushing to GitHub..."
    git push -u origin main 2>&1 || {
        echo ""
        echo "❌ Push failed. Possible reasons:"
        echo "   1. GitHub token not configured"
        echo "   2. SSH keys not set up"
        echo "   3. Repository doesn't exist on GitHub"
        echo ""
        echo "📚 Solutions:"
        echo "   • HTTPS: https://docs.github.com/en/authentication/keeping-your-data-secure/creating-a-personal-access-token"
        echo "   • SSH: https://docs.github.com/en/authentication/connecting-to-github-with-ssh"
        exit 1
    }
    echo "✅ Push successful!"
    echo "🌐 Repository: $REPO_URL"
fi
