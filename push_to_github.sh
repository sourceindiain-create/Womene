#!/usr/bin/env bash
# Script to push WOMENE repository to GitHub
# Usage: ./push_to_github.sh <YOUR_GITHUB_USERNAME_OR_TOKEN>

set -e

GITHUB_USER="${1:-emfi-ceo}"
REPO_NAME="womene"

echo "========================================="
echo "  WOMENE - Pushing repository to GitHub"
echo "  Target: https://github.com/${GITHUB_USER}/${REPO_NAME}.git"
echo "========================================="

# Stage all files
git add .

# Check if commit is needed
if git diff --cached --quiet; then
  echo "No new changes to commit."
else
  git commit -m "feat: complete full-stack WOMENE with Firebase, Vercel backend, Supabase & Flutter mobile"
fi

# Set main branch
git branch -M main

# Configure remote URL
REMOTE_URL="https://github.com/${GITHUB_USER}/${REPO_NAME}.git"
if git remote | grep -q 'origin'; then
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi

echo "Remote set to: $REMOTE_URL"
echo ""
echo "To push with your GitHub credentials, run:"
echo "  git push -u origin main"
echo "========================================="
