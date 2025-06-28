import { telegramBot } from './src/utils/telegramBot.js';

console.log('🤖 Testing Telegram Bot Configuration...\n');

// Test 1: Check if bot is configured
console.log('1. Checking configuration...');
if (telegramBot.isConfigured()) {
    console.log('✅ Bot is configured with token and chat ID');
} else {
    console.log('❌ Bot is not configured. Please run ./setup-telegram.sh');
    process.exit(1);
}

// Test 2: Test connection
console.log('\n2. Testing connection...');
telegramBot.testConnection()
    .then(result => {
        if (result.success) {
            console.log(`✅ Connection successful! Bot: ${result.botInfo.first_name} (@${result.botInfo.username})`);
            
            // Test 3: Send test message
            console.log('\n3. Sending test message...');
            return telegramBot.sendMessage({
                name: 'Test User',
                email: 'test@example.com',
                message: '🧪 This is a test message from the Telegram bot integration. If you received this, everything is working correctly!'
            });
        } else {
            console.log(`❌ Connection failed: ${result.error}`);
            process.exit(1);
        }
    })
    .then(result => {
        if (result.success) {
            console.log('✅ Test message sent successfully!');
            console.log('📱 Check your Telegram for the test message');
            console.log('\n🎉 Telegram bot is fully functional!');
        } else {
            console.log(`❌ Failed to send test message: ${result.error}`);
        }
    })
    .catch(error => {
        console.log(`❌ Error during testing: ${error.message}`);
    });
