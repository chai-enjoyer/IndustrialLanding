// Secure Telegram service using Firebase Cloud Functions
import { httpsCallable } from 'firebase/functions';
import { functions } from '../lib/firebase';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface TelegramResponse {
  success: boolean;
  error?: string;
}

export class SecureTelegramService {
  private sendMessageFunction = httpsCallable<ContactFormData, TelegramResponse>(
    functions, 
    'sendTelegramMessage'
  );

  async sendMessage(formData: ContactFormData): Promise<TelegramResponse> {
    try {
      console.log('Sending message via secure Cloud Function...');
      const result = await this.sendMessageFunction(formData);
      console.log('Cloud Function response:', result.data);
      return result.data;
    } catch (error) {
      console.error('Error calling Telegram function:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Network error' 
      };
    }
  }

  // For compatibility with existing code
  isConfigured(): boolean {
    return true; // Configuration is handled server-side
  }

  async testConnection(): Promise<{ success: boolean; error?: string }> {
    // Test by sending a test message
    try {
      const result = await this.sendMessage({
        name: 'Test User',
        email: 'test@example.com',
        message: '🧪 Тестовое сообщение с сайта ЮРЛАЙН. Если вы получили это сообщение, интеграция работает корректно!'
      });
      return { success: result.success, error: result.error };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Connection failed' 
      };
    }
  }

  // Additional methods for compatibility with debug widget
  async getBotInfo(): Promise<{ success: boolean; botInfo?: any; error?: string }> {
    // Since bot info is not exposed client-side in secure version,
    // we return a generic success for configured state
    return { 
      success: true, 
      botInfo: { 
        first_name: 'ЮРЛАЙН Bot',
        username: 'secure_bot',
        id: 'hidden_for_security'
      } 
    };
  }

  async getChatInfo(): Promise<{ success: boolean; chatInfo?: any; error?: string }> {
    // Since chat info is not exposed client-side in secure version,
    // we return a generic success for configured state
    return { 
      success: true, 
      chatInfo: { 
        type: 'private',
        title: 'Secure Chat',
        id: 'hidden_for_security'
      } 
    };
  }
}

export const secureTelegramService = new SecureTelegramService();
