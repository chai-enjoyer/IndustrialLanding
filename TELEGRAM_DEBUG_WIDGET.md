# Telegram Debug Widget

## Overview
The Telegram Debug Widget is a development tool that appears in the bottom-right corner of the website when running in development mode. It provides real-time status information about the Telegram bot integration and allows developers to test the messaging functionality.

## Features

### 🤖 Status Monitoring
- **Configuration Status**: Shows whether bot token and chat ID are properly configured
- **Bot Information**: Displays bot name and username when connected
- **Chat Information**: Shows target chat type (personal/group)
- **Error Display**: Shows specific error messages for troubleshooting

### 🧪 Testing Functionality
- **Send Test Message**: Allows sending a test message to verify the integration
- **Real-time Feedback**: Shows success/error status of test messages
- **Refresh Status**: Manual refresh button to re-check bot status

### 🎛️ Widget Controls

#### Close/Hide Options
1. **Close Button (×)**: Click the × button in the top-right corner to hide the widget
2. **Keyboard Shortcut**: Press `Ctrl+Shift+T` to toggle the widget visibility
3. **Persistent Setting**: Widget remembers your visibility preference using localStorage

#### Show Widget Again
When the widget is hidden, you can show it again by:
1. **Small Blue Button**: A small 🤖 button appears in the bottom-right corner
2. **Keyboard Shortcut**: Press `Ctrl+Shift+T` to toggle visibility
3. **Refresh Page**: The widget will respect your last saved preference

## Usage

### For Developers
- The widget only appears in **development mode** (`NODE_ENV=development`)
- Use it to verify Telegram bot configuration before deployment
- Test message delivery without using the actual contact form
- Monitor any configuration issues in real-time

### Controls Summary
| Action | Method |
|--------|---------|
| Hide Widget | Click × button |
| Show Widget | Click 🤖 button (when hidden) |
| Toggle Widget | `Ctrl+Shift+T` |
| Refresh Status | Click ↻ button |
| Send Test | Click "Send Test" button |

### Setup Instructions
If the widget shows "Not configured":
1. Run `./setup-telegram.sh` to configure bot credentials
2. Or manually set environment variables in `.env`:
   ```
   VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here
   VITE_TELEGRAM_CHAT_ID=your_chat_id_here
   ```

## Technical Details

### Component Location
- **File**: `src/components/TelegramBotDebug/TelegramBotDebug.tsx`
- **Integration**: Included in `src/App.tsx`

### Key Features
- **Conditional Rendering**: Only shows in development environment
- **localStorage Integration**: Remembers user's visibility preference
- **Responsive Design**: Adapts to light/dark themes
- **Keyboard Accessibility**: Full keyboard navigation support
- **Error Handling**: Graceful error display and recovery

### Styling
- **Position**: Fixed bottom-right corner
- **Z-index**: 50 (above most content)
- **Theme Support**: Automatic light/dark mode adaptation
- **Responsive**: Adapts to mobile screens

## Troubleshooting

### Widget Not Appearing
- Ensure you're in development mode (`npm run dev`)
- Check if widget was manually hidden (press `Ctrl+Shift+T`)
- Look for the small 🤖 button in bottom-right corner

### Bot Status Issues
- Verify `.env` file contains correct credentials
- Run `./test-telegram.sh` to validate configuration
- Check browser console for detailed error messages

### Message Delivery Problems
- Confirm bot is added to the target chat
- Verify chat ID matches the recipient
- Check bot permissions and chat settings

## Related Files
- `src/utils/telegramService.ts` - Main Telegram integration
- `src/utils/telegramBot.ts` - Telegram bot utilities
- `.env` - Environment configuration
- `TELEGRAM_BOT_SETUP.md` - Complete setup guide
