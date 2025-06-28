import React, { useState, useEffect } from 'react';
import { telegramBot } from '@/utils/telegramBot';

interface BotStatus {
  configured: boolean;
  botInfo?: any;
  chatInfo?: any;
  error?: string;
}

export const TelegramBotDebug: React.FC = () => {
  const [status, setStatus] = useState<BotStatus>({ configured: false });
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(() => {
    // Check localStorage for user preference, default to true
    const saved = localStorage.getItem('telegram-debug-visible');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Save visibility preference to localStorage
  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('telegram-debug-visible', 'false');
  };

  // Reset visibility (for debugging purposes)
  const handleShow = () => {
    setIsVisible(true);
    localStorage.setItem('telegram-debug-visible', 'true');
  };

  useEffect(() => {
    checkBotStatus();

    // Add keyboard shortcut to toggle debug panel (Ctrl+Shift+T)
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        setIsVisible((prev: boolean) => {
          const newValue = !prev;
          localStorage.setItem('telegram-debug-visible', JSON.stringify(newValue));
          return newValue;
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const checkBotStatus = async () => {
    const isConfigured = telegramBot.isConfigured();
    
    if (!isConfigured) {
      setStatus({ configured: false, error: 'Bot token or chat ID not configured' });
      return;
    }

    try {
      const [botResult, chatResult] = await Promise.all([
        telegramBot.getBotInfo(),
        telegramBot.getChatInfo()
      ]);

      setStatus({
        configured: true,
        botInfo: botResult.success ? botResult.botInfo : null,
        chatInfo: chatResult.success ? chatResult.chatInfo : null,
        error: !botResult.success ? botResult.error : !chatResult.success ? chatResult.error : undefined
      });
    } catch (error) {
      setStatus({
        configured: true,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  const sendTestMessage = async () => {
    setTesting(true);
    setTestResult(null);

    try {
      const result = await telegramBot.sendMessage({
        name: 'Test User',
        email: 'test@example.com',
        message: '🧪 Тестовое сообщение с сайта ЮРЛАЙН. Если вы получили это сообщение, интеграция работает корректно!'
      });

      if (result.success) {
        setTestResult('✅ Тестовое сообщение отправлено успешно!');
      } else {
        setTestResult(`❌ Ошибка отправки: ${result.error}`);
      }
    } catch (error) {
      setTestResult(`❌ Ошибка: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setTesting(false);
    }
  };

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  // Show small toggle button when widget is hidden
  if (!isVisible) {
    return (
      <button
        onClick={handleShow}
        className="fixed bottom-20 right-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg z-40 transition-all duration-200"
        title="Show Telegram Debug Panel (Ctrl+Shift+T)"
      >
        🤖
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 max-w-sm z-40">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          🤖 Telegram Bot
        </h3>
        <div className="flex items-center space-x-1">
          <button
            onClick={checkBotStatus}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Refresh status"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Close debug panel"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-2 text-xs">
        {/* Configuration Status */}
        <div className="flex items-center space-x-2">
          <span className={`w-2 h-2 rounded-full ${status.configured ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className="text-gray-700 dark:text-gray-300">
            {status.configured ? 'Configured' : 'Not configured'}
          </span>
        </div>

        {/* Bot Info */}
        {status.botInfo && (
          <div className="text-gray-600 dark:text-gray-400">
            Bot: {status.botInfo.first_name} (@{status.botInfo.username})
          </div>
        )}

        {/* Chat Info */}
        {status.chatInfo && (
          <div className="text-gray-600 dark:text-gray-400">
            Chat: {status.chatInfo.type === 'private' ? 'Personal' : status.chatInfo.title || 'Group'}
          </div>
        )}

        {/* Error */}
        {status.error && (
          <div className="text-red-600 dark:text-red-400 text-xs">
            {status.error}
          </div>
        )}

        {/* Test Button */}
        {status.configured && !status.error && (
          <button
            onClick={sendTestMessage}
            disabled={testing}
            className="w-full px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {testing ? 'Sending...' : 'Send Test'}
          </button>
        )}

        {/* Test Result */}
        {testResult && (
          <div className={`text-xs ${testResult.includes('✅') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {testResult}
          </div>
        )}

        {/* Setup Instructions */}
        {!status.configured && (
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Run: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">./setup-telegram.sh</code>
          </div>
        )}
      </div>
    </div>
  );
};
