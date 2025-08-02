import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext'; // ✅ Add this import

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider> {/* ✅ Wrap App with ThemeProvider */}
      <App />
    </ThemeProvider>
  </StrictMode>
);
