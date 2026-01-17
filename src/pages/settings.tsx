import { Moon, Sun, Monitor, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '@/app-context';
import { Themes, type Theme } from '@/types';
import { cn } from '@/lib/utils';

export function Component() {
  const { t, i18n } = useTranslation();
  const { settings, updateSetting } = useAppContext();

  const themeOptions: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: Themes.Light, label: t('settings.themes.light'), icon: <Sun className="h-4 w-4" /> },
    { value: Themes.Dark, label: t('settings.themes.dark'), icon: <Moon className="h-4 w-4" /> },
    {
      value: Themes.System,
      label: t('settings.themes.system'),
      icon: <Monitor className="h-4 w-4" />,
    },
  ];

  const languageOptions = [
    { value: 'zh', label: t('settings.languages.zh') },
    { value: 'en', label: t('settings.languages.en') },
  ];

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{t('settings.title')}</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">{t('settings.theme')}</label>
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

        <div>
          <label className="text-sm font-medium">{t('settings.language')}</label>
          <div className="mt-2 flex gap-2">
            {languageOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleLanguageChange(option.value)}
                className={cn(
                  'flex items-center gap-2 rounded-md border px-4 py-2 text-sm transition-colors',
                  i18n.language === option.value
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border hover:bg-accent'
                )}
              >
                <Languages className="h-4 w-4" />
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
