#!/bin/bash

echo "🔐 Testing Secure Telegram Integration"
echo "======================================"

# Check if Firebase CLI is available
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Please install it first:"
    echo "   npm install -g firebase-tools"
    exit 1
fi

# Check current project
echo "📋 Current Firebase project:"
firebase projects:list | grep "(current)"

echo ""
echo "🔧 Firebase Functions configuration:"
firebase functions:config:get telegram

echo ""
echo "📡 Testing Cloud Function deployment..."
firebase functions:log --only sendTelegramMessage --limit 5

echo ""
echo "✅ If you see no errors above, your secure Telegram integration is ready!"
echo ""
echo "🧪 To test message sending:"
echo "   1. Open your website in development mode"
echo "   2. Use the Telegram debug widget in the bottom-right corner"
echo "   3. Click 'Send Test' button"
echo "   4. Check your Telegram for the test message"
echo ""
echo "🔒 Security benefits of the new setup:"
echo "   ✅ Bot token is hidden from browser"
echo "   ✅ Server-side validation and rate limiting"
echo "   ✅ Proper error handling and logging"
echo "   ✅ No sensitive data in client-side code"
