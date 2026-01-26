import { Outlet, NavLink } from 'react-router-dom';
import { Settings, FileText, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

export function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex h-full">
      <aside className="w-48 border-r border-border bg-card p-4">
        <h1 className="mb-6 text-lg font-semibold">{t('nav.title')}</h1>
        <nav className="space-y-1">
          <NavLink
            to="/starship"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                isActive ? 'bg-accent text-theme' : 'hover:bg-accent/50'
              )
            }
          >
            <Rocket className="h-4 w-4" />
            {t('nav.starship')}
          </NavLink>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                isActive ? 'bg-accent text-theme' : 'hover:bg-accent/50'
              )
            }
          >
            <FileText className="h-4 w-4" />
            {t('nav.backups')}
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                isActive ? 'bg-accent text-theme' : 'hover:bg-accent/50'
              )
            }
          >
            <Settings className="h-4 w-4" />
            {t('nav.settings')}
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
