#!/bin/bash

echo "🎯 Get Your Telegram Chat ID"
echo "============================"
echo ""

BOT_TOKEN="8054931856:AAEjMDdOPO6C6qsslu3WQQnC1NV24nM7Apg"
BOT_USERNAME="chaiienjoyerbot"

echo "Step 1: Send a message to your bot"
echo "👉 Go to: https://t.me/$BOT_USERNAME"
echo "👉 Send: /start"
echo ""
echo "Step 2: Press Enter when you've sent the message..."
read -p ""

echo ""
echo "🔄 Checking for your message..."

# Get updates from Telegram
UPDATES=$(curl -s "https://api.telegram.org/bot$BOT_TOKEN/getUpdates")

echo ""
echo "📋 Recent chats that messaged the bot:"
echo "======================================"

# Parse the JSON to extract chat IDs and usernames
echo "$UPDATES" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    if data.get('ok') and data.get('result'):
        seen_chats = {}
        for update in data['result']:
            if 'message' in update:
                chat = update['message']['chat']
                chat_id = chat['id']
                chat_type = chat.get('type', 'private')
                
                if chat_id not in seen_chats:
                    if chat_type == 'private':
                        first_name = chat.get('first_name', '')
                        last_name = chat.get('last_name', '')
                        username = chat.get('username', 'no_username')
                        name = f'{first_name} {last_name}'.strip()
                        
                        print(f'👤 User: {name}')
                        print(f'   Username: @{username}')
                        print(f'   Chat ID: {chat_id}')
                        print(f'   ✅ Use this chat ID in your .env file')
                        print()
                        
                        seen_chats[chat_id] = True
                    else:
                        title = chat.get('title', 'Unknown Group')
                        print(f'👥 Group: {title}')
                        print(f'   Chat ID: {chat_id}')
                        print()
                        
                        seen_chats[chat_id] = True
        
        if not seen_chats:
            print('❌ No messages found!')
            print()
            print('Make sure you:')
            print('1. Sent /start to @$BOT_USERNAME')
            print('2. The message was sent recently')
            print('3. Try sending another message and run this script again')
    else:
        print('❌ No updates or API error')
        print('Response:', data)
except Exception as e:
    print(f'❌ Error parsing response: {e}')
    print('Raw response:')
    print(sys.stdin.read())
"

echo ""
echo "🔧 Next steps:"
echo "1. Copy your Chat ID from above"
echo "2. Open your .env file"
echo "3. Update: VITE_TELEGRAM_CHAT_ID=your_chat_id_here"
echo "4. Restart your dev server: npm run dev"
echo ""
echo "🚀 Your bot link: https://t.me/$BOT_USERNAME"
