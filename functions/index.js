const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Secure Telegram bot function
exports.sendTelegramMessage = functions.https.onCall(async (data, context) => {
  // Validate input
  if (!data.name || !data.email || !data.message) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required fields');
  }

  const BOT_TOKEN = functions.config().telegram.bot_token;
  const CHAT_ID = functions.config().telegram.chat_id;

  if (!BOT_TOKEN || !CHAT_ID) {
    throw new functions.https.HttpsError('failed-precondition', 'Telegram not configured');
  }

  const timestamp = new Date().toLocaleString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Almaty'
  });

  const message = `🆕 *Новое сообщение с сайта ЮРЛАЙН*

👤 *Имя:* ${data.name}
📧 *Email:* ${data.email}
📝 *Сообщение:*
${data.message}

🕐 *Время:* ${timestamp}

---
Сайт: konsaltingcentr-yurline.kz`;

  try {
    // Use node-fetch for HTTP requests
    const fetch = (await import('node-fetch')).default;
    
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
        disable_web_page_preview: true
      })
    });

    const result = await response.json();
    
    if (!result.ok) {
      console.error('Telegram API error:', result);
      throw new Error(result.description || 'Telegram API error');
    }

    console.log('Message sent successfully to Telegram');
    return { success: true };
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    throw new functions.https.HttpsError('internal', 'Failed to send message');
  }
});
