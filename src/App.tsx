import { ThemeProvider } from '@/context';
import { Layout } from '@/components';
import { HomePage } from '@/pages';
import './tailwind.css';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <HomePage />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
