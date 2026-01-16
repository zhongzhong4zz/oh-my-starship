import { Moon, Sun, Monitor } from 'lucide-react';
import { useAppContext } from '@/app-context';
import { Themes, type Theme } from '@/types';
import { cn } from '@/lib/utils';

const themeOptions: { value: Theme; label: string; icon: React.ReactNode }[] = [
  { value: Themes.Light, label: 'Light', icon: <Sun className="h-4 w-4" /> },
  { value: Themes.Dark, label: 'Dark', icon: <Moon className="h-4 w-4" /> },
  { value: Themes.System, label: 'System', icon: <Monitor className="h-4 w-4" /> },
];

export function Component() {
  const { settings, updateSetting } = useAppContext();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Settings</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Theme</label>
          <div className="mt-2 flex gap-2">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateSetting('theme', option.value)}
                className={cn(
                  'flex items-center gap-2 rounded-md border px-4 py-2 text-sm transition-colors',
                  settings.theme === option.value
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border hover:bg-accent'
                )}
              >
                {option.icon}
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
