import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';

import '@/i18n';
import { getSettings } from '@/services/cmds';
import { applyTheme } from '@/lib/utils';
import { Themes } from './types';

(async () => {
  const settings = await getSettings();
  applyTheme(settings.theme !== Themes.System ? settings.theme : 'light');

  createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <App settings={settings} />
    </StrictMode>
  );
})();
