import { Outlet, NavLink } from 'react-router-dom';
import { Settings, FileText, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Home() {
  return (
    <div className="flex h-full">
      <aside className="w-48 border-r border-border bg-card p-4">
        <h1 className="mb-6 text-lg font-semibold">Starship Config</h1>
        <nav className="space-y-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-accent/50'
              )
            }
          >
            <FileText className="h-4 w-4" />
            Configs
          </NavLink>
          <NavLink
            to="/starship"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-accent/50'
              )
            }
          >
            <Terminal className="h-4 w-4" />
            Starship
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-accent/50'
              )
            }
          >
            <Settings className="h-4 w-4" />
            Settings
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
