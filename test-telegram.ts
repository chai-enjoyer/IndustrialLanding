// Test script for Telegram Bot functionality
// Run with: node --loader ts-node/esm test-telegram.ts

import { telegramBot } from './src/utils/telegramBot.js';

async function testTelegramBot() {
  console.log('🤖 Testing Telegram Bot Integration...\n');

  // Check if bot is configured
  console.log('1. Checking bot configuration...');
  const isConfigured = telegramBot.isConfigured();
  console.log(`   Bot configured: ${isConfigured ? '✅ Yes' : '❌ No'}`);
  
  if (!isConfigured) {
    console.log('   Please set VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID in .env file');
    return;
  }

  // Test connection
  console.log('\n2. Testing bot connection...');
  const connectionTest = await telegramBot.testConnection();
  
  if (connectionTest.success) {
    console.log('   Connection: ✅ Success');
    console.log(`   Bot Info: ${connectionTest.botInfo?.first_name} (@${connectionTest.botInfo?.username})`);
  } else {
    console.log('   Connection: ❌ Failed');
    console.log(`   Error: ${connectionTest.error}`);
    return;
  }

  // Send test message
  console.log('\n3. Sending test message...');
  const testResult = await telegramBot.sendMessage({
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message from the website contact form.'
  });

  if (testResult.success) {
    console.log('   Test message: ✅ Sent successfully');
    console.log('   Check your Telegram for the message!');
  } else {
    console.log('   Test message: ❌ Failed');
    console.log(`   Error: ${testResult.error}`);
  }

  console.log('\n🎉 Telegram Bot test completed!');
}

// Run the test
testTelegramBot().catch(console.error);
