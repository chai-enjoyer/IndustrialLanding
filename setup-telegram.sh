#!/bin/bash

# Telegram Bot Setup Helper Script
echo "🤖 Telegram Bot Setup Helper"
echo "============================"
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found!"
    echo "Please copy .env.example to .env first:"
    echo "   cp .env.example .env"
    exit 1
fi

echo "This script will help you set up your Telegram bot for the contact form."
echo ""

# Function to update .env file
update_env() {
    local key=$1
    local value=$2
    
    if grep -q "^$key=" .env; then
        # Update existing key
        sed -i "s/^$key=.*/$key=$value/" .env
    else
        # Add new key
        echo "$key=$value" >> .env
    fi
}

echo "📋 Step 1: Bot Token"
echo "==================="
echo "1. Go to https://t.me/BotFather"
echo "2. Send /newbot command"
echo "3. Follow instructions to create your bot"
echo "4. Copy the bot token"
echo ""
read -p "Enter your bot token: " BOT_TOKEN

if [ -z "$BOT_TOKEN" ]; then
    echo "❌ Bot token is required!"
    exit 1
fi

echo ""
echo "📋 Step 2: Chat ID"
echo "=================="
echo "Choose one option:"
echo "1. Personal chat - Go to https://t.me/userinfobot and get your User ID"
echo "2. Group chat - Add bot to group, make it admin, get group ID"
echo "3. Channel - Add bot to channel as admin, get channel ID"
echo ""
read -p "Enter your chat ID: " CHAT_ID

if [ -z "$CHAT_ID" ]; then
    echo "❌ Chat ID is required!"
    exit 1
fi

# Update .env file
echo ""
echo "💾 Updating .env file..."
update_env "VITE_TELEGRAM_BOT_TOKEN" "$BOT_TOKEN"
update_env "VITE_TELEGRAM_CHAT_ID" "$CHAT_ID"

echo "✅ Configuration saved to .env file!"
echo ""

# Test the bot
echo "🧪 Testing bot configuration..."
echo ""

# Create a simple test
cat > telegram-test.js << 'EOF'
const fetch = require('node-fetch');
const fs = require('fs');

// Read .env file
const env = fs.readFileSync('.env', 'utf8');
const botToken = env.match(/VITE_TELEGRAM_BOT_TOKEN=(.+)/)?.[1];
const chatId = env.match(/VITE_TELEGRAM_CHAT_ID=(.+)/)?.[1];

if (!botToken || !chatId) {
    console.log('❌ Bot token or chat ID not found in .env');
    process.exit(1);
}

async function testBot() {
    try {
        // Test bot info
        const botResponse = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
        const botData = await botResponse.json();
        
        if (!botData.ok) {
            console.log('❌ Bot token is invalid:', botData.description);
            return;
        }
        
        console.log('✅ Bot is valid:', botData.result.first_name, `(@${botData.result.username})`);
        
        // Send test message
        const message = `🎉 Тест подключения успешен!
        
🤖 Бот: ${botData.result.first_name}
📧 Сайт: ЮРЛАЙН Консалтинг
⏰ Время: ${new Date().toLocaleString('ru-RU')}

Теперь все сообщения с контактной формы будут приходить сюда!`;

        const sendResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        });
        
        const sendData = await sendResponse.json();
        
        if (sendData.ok) {
            console.log('✅ Test message sent successfully!');
            console.log('📱 Check your Telegram for the test message');
        } else {
            console.log('❌ Failed to send message:', sendData.description);
        }
        
    } catch (error) {
        console.log('❌ Error testing bot:', error.message);
    }
}

testBot();
EOF

# Run the test if node is available
if command -v node >/dev/null 2>&1; then
    if command -v npm >/dev/null 2>&1; then
        # Install node-fetch if needed
        if [ ! -d "node_modules" ]; then
            echo "Installing dependencies..."
            npm install node-fetch >/dev/null 2>&1
        fi
    fi
    
    node telegram-test.js
    rm telegram-test.js
else
    echo "⚠️  Node.js not found. Please test manually:"
    echo "1. Start the development server: npm run dev"
    echo "2. Fill out the contact form"
    echo "3. Check your Telegram for messages"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Start the dev server: npm run dev"
echo "2. Test the contact form on your site"
echo "3. Messages will appear in your Telegram!"
echo ""
echo "📖 For more info, see: TELEGRAM_BOT_SETUP.md"
