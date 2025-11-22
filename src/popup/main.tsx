import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { i18n } from '@/utils/i18n';
import { GlobalStoreProvider } from '@/store/GlobalStore';
import { AppLayout } from './app/AppLayout';
import { AppHeader } from './app/AppHeader';
import { UserProxyList } from './app/UserProxyList';
import { SystemProxy } from './app/SystemProxy';
import '@/styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <GlobalStoreProvider>
        <AppLayout>
          <AppHeader />
          <UserProxyList />
          <SystemProxy />
        </AppLayout>
      </GlobalStoreProvider>
    </I18nextProvider>
  </StrictMode>,
);
