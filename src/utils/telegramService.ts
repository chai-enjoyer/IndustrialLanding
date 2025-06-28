/**
 * Telegram Bot Service
 * Handles sending messages to a specific Telegram chat via bot API
 */

interface TelegramMessage {
  name: string;
  email: string;
  message: string;
  timestamp?: string;
}

interface TelegramResponse {
  ok: boolean;
  result?: any;
  error_code?: number;
  description?: string;
}

class TelegramService {
  private readonly botToken: string;
  private readonly chatId: string;
  private readonly baseUrl: string;

  constructor() {
    this.botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    this.chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    this.baseUrl = `https://api.telegram.org/bot${this.botToken}`;

    if (!this.botToken || !this.chatId) {
      console.warn('Telegram bot configuration not found in environment variables');
    }
  }

  /**
   * Check if Telegram service is properly configured
   */
  isConfigured(): boolean {
    return !!(this.botToken && this.chatId);
  }

  /**
   * Format message for Telegram
   */
  private formatMessage(data: TelegramMessage): string {
    const timestamp = data.timestamp || new Date().toLocaleString('ru-RU', {
      timeZone: 'Asia/Almaty',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    return `🔔 <b>Новое сообщение с сайта</b>

👤 <b>Имя:</b> ${this.escapeHtml(data.name)}
📧 <b>Email:</b> ${this.escapeHtml(data.email)}
💬 <b>Сообщение:</b>
${this.escapeHtml(data.message)}

🕒 <b>Время:</b> ${timestamp}
🌐 <b>Источник:</b> Сайт ТОО «КОНСАЛТИНГ ЦЕНТР ЮРЛАЙН»`;
  }

  /**
   * Escape HTML characters for Telegram
   */
  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }

  /**
   * Send message to Telegram
   */
  async sendMessage(data: TelegramMessage): Promise<{ success: boolean; error?: string }> {
    if (!this.isConfigured()) {
      console.error('Telegram service is not properly configured');
      return { 
        success: false, 
        error: 'Telegram service not configured' 
      };
    }

    try {
      const message = this.formatMessage(data);
      
      const response = await fetch(`${this.baseUrl}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.chatId,
          text: message,
          parse_mode: 'HTML',
          disable_web_page_preview: true
        })
      });

      const result: TelegramResponse = await response.json();

      if (result.ok) {
        console.log('Message sent to Telegram successfully');
        return { success: true };
      } else {
        console.error('Telegram API error:', result);
        return { 
          success: false, 
          error: result.description || 'Failed to send message' 
        };
      }
    } catch (error) {
      console.error('Error sending message to Telegram:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Network error' 
      };
    }
  }

  /**
   * Test the Telegram bot connection
   */
  async testConnection(): Promise<{ success: boolean; error?: string }> {
    if (!this.isConfigured()) {
      return { 
        success: false, 
        error: 'Telegram service not configured' 
      };
    }

    try {
      const response = await fetch(`${this.baseUrl}/getMe`);
      const result: TelegramResponse = await response.json();

      if (result.ok) {
        console.log('Telegram bot connection successful:', result.result);
        return { success: true };
      } else {
        console.error('Telegram bot test failed:', result);
        return { 
          success: false, 
          error: result.description || 'Connection test failed' 
        };
      }
    } catch (error) {
      console.error('Error testing Telegram connection:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Network error' 
      };
    }
  }
}

// Export singleton instance
export const telegramService = new TelegramService();
export default telegramService;
