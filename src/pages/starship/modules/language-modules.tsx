import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useStarshipToml, useSaveStarshipToml } from '@/lib/query';
import { parseTomlSection, updateTomlSection } from '../toml-utils';
import { cn } from '@/lib/utils';

interface LanguageConfig {
  symbol: string;
  style: string;
  format: string;
  version_format: string;
  disabled: boolean;
}

interface LanguageDefinition {
  id: string;
  name: string;
  sectionName: string;
  defaults: LanguageConfig;
}

const languages: LanguageDefinition[] = [
  {
    id: 'nodejs',
    name: 'Node.js',
    sectionName: 'nodejs',
    defaults: {
      symbol: ' ',
      style: 'bold green',
      format: '[$symbol($version )]($style)',
      version_format: 'v${raw}',
      disabled: false,
    },
  },
  {
    id: 'python',
    name: 'Python',
    sectionName: 'python',
    defaults: {
      symbol: '🐍 ',
      style: 'bold yellow',
      format: '[$symbol$pyenv_prefix($version )(\\($virtualenv\\) )]($style)',
      version_format: 'v${raw}',
      disabled: false,
    },
  },
  {
    id: 'rust',
    name: 'Rust',
    sectionName: 'rust',
    defaults: {
      symbol: '🦀 ',
      style: 'bold red',
      format: '[$symbol($version )]($style)',
      version_format: 'v${raw}',
      disabled: false,
    },
  },
  {
    id: 'golang',
    name: 'Go',
    sectionName: 'golang',
    defaults: {
      symbol: '🐹 ',
      style: 'bold cyan',
      format: '[$symbol($version )]($style)',
      version_format: 'v${raw}',
      disabled: false,
    },
  },
  {
    id: 'java',
    name: 'Java',
    sectionName: 'java',
    defaults: {
      symbol: '☕ ',
      style: 'bold red',
      format: '[$symbol($version )]($style)',
      version_format: 'v${raw}',
      disabled: false,
    },
  },
  {
    id: 'php',
    name: 'PHP',
    sectionName: 'php',
    defaults: {
      symbol: '🐘 ',
      style: 'bold purple',
      format: '[$symbol($version )]($style)',
      version_format: 'v${raw}',
      disabled: false,
    },
  },
  {
    id: 'ruby',
    name: 'Ruby',
    sectionName: 'ruby',
    defaults: {
      symbol: '💎 ',
      style: 'bold red',
      format: '[$symbol($version )]($style)',
      version_format: 'v${raw}',
      disabled: false,
    },
  },
  {
    id: 'docker_context',
    name: 'Docker',
    sectionName: 'docker_context',
    defaults: {
      symbol: '🐳 ',
      style: 'bold blue',
      format: '[$symbol$context]($style) ',
      version_format: 'v${raw}',
      disabled: false,
    },
  },
];

export function LanguageModules() {
  const [selectedLang, setSelectedLang] = useState<string>(languages[0].id);
  const { data: toml, isLoading } = useStarshipToml();
  const { mutate: saveToml, isPending } = useSaveStarshipToml();

  const currentLang = languages.find((l) => l.id === selectedLang) || languages[0];

  const { register, handleSubmit, reset, watch, setValue } = useForm<LanguageConfig>({
    defaultValues: currentLang.defaults,
  });

  const disabled = watch('disabled');

  useEffect(() => {
    if (toml && currentLang) {
      const section = parseTomlSection<LanguageConfig>(toml, currentLang.sectionName);
      reset({ ...currentLang.defaults, ...section });
    }
  }, [toml, currentLang, reset]);

  const onSubmit = (data: LanguageConfig) => {
    if (!toml || !currentLang) return;

    const updatedToml = updateTomlSection(toml, currentLang.sectionName, data);
    saveToml(updatedToml, {
      onSuccess: () => toast.success(`${currentLang.name} module saved`),
      onError: (error) => toast.error(`Failed to save: ${error.message}`),
    });
  };

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Language Modules</h3>
        <p className="text-sm text-muted-foreground">
          Configure how programming language versions are displayed in your prompt.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {languages.map((lang) => (
          <button
            key={lang.id}
            type="button"
            onClick={() => setSelectedLang(lang.id)}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              selectedLang === lang.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            )}
          >
            {lang.name}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border border-border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="disabled">Disable {currentLang.name} Module</Label>
            <p className="text-xs text-muted-foreground">
              Hide {currentLang.name} version from your prompt
            </p>
          </div>
          <Switch
            id="disabled"
            checked={disabled}
            onCheckedChange={(checked) => setValue('disabled', checked)}
          />
        </div>

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="symbol">Symbol</Label>
            <Input
              id="symbol"
              {...register('symbol')}
              placeholder={currentLang.defaults.symbol}
              disabled={disabled}
            />
            <p className="text-xs text-muted-foreground">
              Symbol displayed before the version
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="style">Style</Label>
            <Input
              id="style"
              {...register('style')}
              placeholder={currentLang.defaults.style}
              disabled={disabled}
            />
            <p className="text-xs text-muted-foreground">
              Style for the module (e.g., bold green, #ff0000)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="format">Format</Label>
            <Input
              id="format"
              {...register('format')}
              placeholder={currentLang.defaults.format}
              disabled={disabled}
            />
            <p className="text-xs text-muted-foreground">
              Format string for the module display
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="version_format">Version Format</Label>
            <Input
              id="version_format"
              {...register('version_format')}
              placeholder="v${raw}"
              disabled={disabled}
            />
            <p className="text-xs text-muted-foreground">
              Format string for the version number
            </p>
          </div>
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Saving...' : `Save ${currentLang.name}`}
        </Button>
      </form>
    </div>
  );
}
