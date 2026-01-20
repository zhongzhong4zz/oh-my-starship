import { useState } from 'react';
import { ChevronRight, Terminal, FolderOpen, GitBranch, Clock, Code } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CharacterModule } from './modules/character-module';
import { DirectoryModule } from './modules/directory-module';
import { GitModule } from './modules/git-module';
import { TimeModule } from './modules/time-module';
import { LanguageModules } from './modules/language-modules';
import { cn } from '@/lib/utils';

type ModuleSection = 'character' | 'directory' | 'git' | 'time' | 'languages';

export function ModuleEditor() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<ModuleSection>('character');

  const sections = [
    {
      id: 'character' as const,
      name: t('starship.modules.character.name'),
      icon: Terminal,
      description: t('starship.modules.character.description'),
    },
    {
      id: 'directory' as const,
      name: t('starship.modules.directory.name'),
      icon: FolderOpen,
      description: t('starship.modules.directory.description'),
    },
    {
      id: 'git' as const,
      name: t('starship.modules.git.name'),
      icon: GitBranch,
      description: t('starship.modules.git.description'),
    },
    {
      id: 'time' as const,
      name: t('starship.modules.time.name'),
      icon: Clock,
      description: t('starship.modules.time.description'),
    },
    {
      id: 'languages' as const,
      name: t('starship.modules.languages.name'),
      icon: Code,
      description: t('starship.modules.languages.description'),
    },
  ];

  return (
    <div className="flex h-[calc(100vh-140px)] gap-4">
      <nav className="w-56 space-y-1 overflow-y-auto rounded-lg border border-border bg-card p-2">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors',
                isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'
              )}
            >
              <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="flex-1 truncate">
                <div className="font-medium">{section.name}</div>
                <div className="text-xs text-muted-foreground">{section.description}</div>
              </div>
              <ChevronRight
                className={cn(
                  'h-4 w-4 text-muted-foreground transition-transform',
                  isActive && 'rotate-90'
                )}
              />
            </button>
          );
        })}
      </nav>

      <div className="flex-1 overflow-y-auto rounded-lg border border-border bg-card p-4">
        {activeSection === 'character' && <CharacterModule />}
        {activeSection === 'directory' && <DirectoryModule />}
        {activeSection === 'git' && <GitModule />}
        {activeSection === 'time' && <TimeModule />}
        {activeSection === 'languages' && <LanguageModules />}
      </div>
    </div>
  );
}
