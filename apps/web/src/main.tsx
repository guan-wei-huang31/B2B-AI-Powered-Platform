// import i18n (needs to be bundled
import './index.css';

import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';

// import { ThemeProvider } from '@/components/theme-provider/index.tsx';
import App from './App.tsx';
import i18n from './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      {/* <ThemeProvider> */}
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
      {/* </ThemeProvider> */}
    </I18nextProvider>
  </StrictMode>
);
