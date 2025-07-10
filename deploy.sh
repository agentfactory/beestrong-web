#!/bin/bash

echo "🚀 Next.js Mentorship App Deployment Script"
echo "==========================================="
echo ""
echo "Choose your deployment platform:"
echo "1) Vercel (Recommended)"
echo "2) Netlify"
echo "3) Build for production (local)"
echo "4) Cancel"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
  1)
    echo "Deploying to Vercel..."
    if ! command -v vercel &> /dev/null; then
      echo "Vercel CLI not found. Installing..."
      npm i -g vercel
    fi
    vercel
    ;;
  2)
    echo "Deploying to Netlify..."
    if ! command -v netlify &> /dev/null; then
      echo "Netlify CLI not found. Installing..."
      npm i -g netlify-cli
    fi
    netlify deploy
    ;;
  3)
    echo "Building for production..."
    npm run build
    echo ""
    echo "✅ Production build complete!"
    echo "Files are in the .next directory"
    echo ""
    echo "To serve the production build locally, run:"
    echo "npm run start"
    ;;
  4)
    echo "Deployment cancelled."
    exit 0
    ;;
  *)
    echo "Invalid choice. Please run the script again."
    exit 1
    ;;
esac