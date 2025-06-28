import { ThemeProvider } from '@/context';
import { Layout, TelegramBotDebug } from '@/components';
import { HomePage } from '@/pages';
import './tailwind.css';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <HomePage />
        <TelegramBotDebug />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
