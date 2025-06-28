// Telegram Bot API utilities
interface TelegramMessage {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

interface TelegramResponse {
  ok: boolean;
  result?: any;
  error_code?: number;
  description?: string;
}

export class TelegramBot {
  private botToken: string;
  private chatId: string;

  constructor() {
    this.botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '';
    this.chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID || '';
  }

  /**
   * Форматирует сообщение для отправки в Telegram
   */
  private formatMessage(data: TelegramMessage): string {
    const { name, email, message, timestamp } = data;
    
    return `🆕 *Новое сообщение с сайта ЮРЛАЙН*

👤 *Имя:* ${name}
📧 *Email:* ${email}
📝 *Сообщение:*
${message}

🕐 *Время:* ${timestamp}

---
Сайт: konsalting-ts.web.app`;
  }

  /**
   * Отправляет сообщение в Telegram
   */
  async sendMessage(formData: Omit<TelegramMessage, 'timestamp'>): Promise<{ success: boolean; error?: string }> {
    try {
      // Проверяем наличие необходимых данных
      if (!this.botToken || !this.chatId) {
        console.warn('Telegram bot credentials not configured');
        return { success: false, error: 'Telegram bot not configured' };
      }

      const timestamp = new Date().toLocaleString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Almaty'
      });

      const messageData: TelegramMessage = {
        ...formData,
        timestamp
      };

      const telegramMessage = this.formatMessage(messageData);

      const response = await fetch(`https://api.telegram.org/bot${this.botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.chatId,
          text: telegramMessage,
          parse_mode: 'Markdown',
          disable_web_page_preview: true
        })
      });

      const result: TelegramResponse = await response.json();

      if (result.ok) {
        console.log('Message sent to Telegram successfully');
        return { success: true };
      } else {
        console.error('Telegram API error:', result.description);
        return { success: false, error: result.description || 'Unknown Telegram API error' };
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
   * Проверяет конфигурацию бота
   */
  isConfigured(): boolean {
    return !!(this.botToken && this.chatId);
  }

  /**
   * Тестирует соединение с Telegram Bot API
   */
  async testConnection(): Promise<{ success: boolean; botInfo?: any; error?: string }> {
    try {
      if (!this.botToken) {
        return { success: false, error: 'Bot token not configured' };
      }

      const response = await fetch(`https://api.telegram.org/bot${this.botToken}/getMe`);
      const result: TelegramResponse = await response.json();

      if (result.ok) {
        return { success: true, botInfo: result.result };
      } else {
        return { success: false, error: result.description || 'Unknown error' };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Network error' 
      };
    }
  }

  /**
   * Получает информацию о боте
   */
  async getBotInfo(): Promise<{ success: boolean; botInfo?: any; error?: string }> {
    try {
      if (!this.botToken) {
        return { success: false, error: 'Bot token not configured' };
      }

      const response = await fetch(`https://api.telegram.org/bot${this.botToken}/getMe`);
      const result: TelegramResponse = await response.json();

      if (result.ok) {
        return { success: true, botInfo: result.result };
      } else {
        return { success: false, error: result.description || 'Unknown error' };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Network error' 
      };
    }
  }

  /**
   * Проверяет статус чата
   */
  async getChatInfo(): Promise<{ success: boolean; chatInfo?: any; error?: string }> {
    try {
      if (!this.botToken || !this.chatId) {
        return { success: false, error: 'Bot token or chat ID not configured' };
      }

      const response = await fetch(`https://api.telegram.org/bot${this.botToken}/getChat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: this.chatId })
      });
      
      const result: TelegramResponse = await response.json();

      if (result.ok) {
        return { success: true, chatInfo: result.result };
      } else {
        return { success: false, error: result.description || 'Unknown error' };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Network error' 
      };
    }
  }
}

// Экспортируем единственный экземпляр
export const telegramBot = new TelegramBot();
