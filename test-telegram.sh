#!/bin/bash

echo "🔧 Testing Telegram Bot Integration"
echo "=================================="
echo ""

# Read environment variables
source .env 2>/dev/null || true

BOT_TOKEN="$VITE_TELEGRAM_BOT_TOKEN"
CHAT_ID="$VITE_TELEGRAM_CHAT_ID"

if [ -z "$BOT_TOKEN" ]; then
    echo "❌ Bot token not found in .env file"
    exit 1
fi

echo "🤖 Bot Token: ${BOT_TOKEN:0:10}..."
echo "💬 Chat ID: $CHAT_ID"
echo ""

# Test bot info
echo "🔄 Testing bot connection..."
BOT_INFO=$(curl -s "https://api.telegram.org/bot$BOT_TOKEN/getMe")
BOT_OK=$(echo "$BOT_INFO" | jq -r '.ok // false' 2>/dev/null || echo "false")

if [ "$BOT_OK" = "true" ]; then
    BOT_NAME=$(echo "$BOT_INFO" | jq -r '.result.first_name // "Unknown"' 2>/dev/null || echo "Unknown")
    BOT_USERNAME=$(echo "$BOT_INFO" | jq -r '.result.username // "unknown"' 2>/dev/null || echo "unknown")
    echo "✅ Bot connection successful!"
    echo "   Name: $BOT_NAME"
    echo "   Username: @$BOT_USERNAME"
    echo "   Link: https://t.me/$BOT_USERNAME"
else
    echo "❌ Bot connection failed!"
    echo "   Response: $BOT_INFO"
    exit 1
fi

echo ""

# Test sending message
if [ -n "$CHAT_ID" ]; then
    echo "🔄 Testing message sending to chat ID: $CHAT_ID"
    
    TEST_MESSAGE="🧪 <b>Test from YurLine Consulting</b>

🕒 Time: $(date '+%Y-%m-%d %H:%M:%S')
🌐 Source: Telegram integration test
✅ If you see this message, the integration is working!

<i>This is a test message from the contact form integration.</i>"

    SEND_RESULT=$(curl -s -X POST "https://api.telegram.org/bot$BOT_TOKEN/sendMessage" \
        -H "Content-Type: application/json" \
        -d "{
            \"chat_id\": \"$CHAT_ID\",
            \"text\": \"$TEST_MESSAGE\",
            \"parse_mode\": \"HTML\"
        }")
    
    SEND_OK=$(echo "$SEND_RESULT" | jq -r '.ok // false' 2>/dev/null || echo "false")
    
    if [ "$SEND_OK" = "true" ]; then
        echo "✅ Test message sent successfully!"
        echo "📱 Check your Telegram for the test message"
    else
        ERROR_DESC=$(echo "$SEND_RESULT" | jq -r '.description // "Unknown error"' 2>/dev/null || echo "Unknown error")
        echo "❌ Failed to send test message: $ERROR_DESC"
        
        if [[ "$ERROR_DESC" == *"chat not found"* ]]; then
            echo ""
            echo "💡 Solution:"
            echo "   1. Go to https://t.me/$BOT_USERNAME"
            echo "   2. Send /start to the bot"
            echo "   3. Get your chat ID from @userinfobot"
            echo "   4. Update VITE_TELEGRAM_CHAT_ID in .env file"
        fi
    fi
else
    echo "⚠️  Chat ID not set. Please configure VITE_TELEGRAM_CHAT_ID in .env"
fi

echo ""
echo "📋 Next steps for user @c7mdeo:"
echo "   1. Visit: https://t.me/$BOT_USERNAME"
echo "   2. Send: /start"
echo "   3. Get chat ID from: https://t.me/userinfobot"
echo "   4. Update .env with correct chat ID"
echo ""
