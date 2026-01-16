import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useStarshipToml, useSaveStarshipToml } from '@/lib/query';
import { parseTomlSection, updateTomlSection } from '../toml-utils';

interface DirectoryFormData {
  truncation_length: number;
  truncation_symbol: string;
  truncate_to_repo: boolean;
  style: string;
  format: string;
  read_only: string;
  read_only_style: string;
  home_symbol: string;
  disabled: boolean;
}

const defaults: DirectoryFormData = {
  truncation_length: 3,
  truncation_symbol: '…',
  truncate_to_repo: true,
  style: 'bold cyan',
  format: '[$path]($style)[$read_only]($read_only_style) ',
  read_only: '🔒',
  read_only_style: 'red',
  home_symbol: '~',
  disabled: false,
};

export function DirectoryModule() {
  const { data: toml, isLoading } = useStarshipToml();
  const { mutate: saveToml, isPending } = useSaveStarshipToml();

  const { register, handleSubmit, reset, watch, setValue } = useForm<DirectoryFormData>({
    defaultValues: defaults,
  });

  const disabled = watch('disabled');

  useEffect(() => {
    if (toml) {
      const section = parseTomlSection<DirectoryFormData>(toml, 'directory');
      reset({ ...defaults, ...section });
    }
  }, [toml, reset]);

  const onSubmit = (data: DirectoryFormData) => {
    if (!toml) return;

    const updatedToml = updateTomlSection(toml, 'directory', data);
    saveToml(updatedToml, {
      onSuccess: () => toast.success('Directory module saved'),
      onError: (error) => toast.error(`Failed to save: ${error.message}`),
    });
  };

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Directory Module</h3>
        <p className="text-sm text-muted-foreground">
          Configure how the current directory path is displayed in your prompt.
        </p>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-border p-4">
        <div className="space-y-0.5">
          <Label htmlFor="disabled">Disable Module</Label>
          <p className="text-xs text-muted-foreground">Hide the directory module from your prompt</p>
        </div>
        <Switch
          id="disabled"
          checked={disabled}
          onCheckedChange={(checked) => setValue('disabled', checked)}
        />
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="truncation_length">Truncation Length</Label>
          <Input
            id="truncation_length"
            type="number"
            {...register('truncation_length', { valueAsNumber: true })}
            placeholder="3"
            disabled={disabled}
          />
          <p className="text-xs text-muted-foreground">
            Number of parent directories to show
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="truncation_symbol">Truncation Symbol</Label>
          <Input
            id="truncation_symbol"
            {...register('truncation_symbol')}
            placeholder="…"
            disabled={disabled}
          />
          <p className="text-xs text-muted-foreground">
            Symbol used to indicate truncated paths
          </p>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="truncate_to_repo">Truncate to Repo Root</Label>
            <p className="text-xs text-muted-foreground">
              Truncate to the root of the git repository
            </p>
          </div>
          <Switch
            id="truncate_to_repo"
            checked={watch('truncate_to_repo')}
            onCheckedChange={(checked) => setValue('truncate_to_repo', checked)}
            disabled={disabled}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="style">Style</Label>
          <Input
            id="style"
            {...register('style')}
            placeholder="bold cyan"
            disabled={disabled}
          />
          <p className="text-xs text-muted-foreground">
            Style for the directory path
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="format">Format</Label>
          <Input
            id="format"
            {...register('format')}
            placeholder="[$path]($style)[$read_only]($read_only_style) "
            disabled={disabled}
          />
          <p className="text-xs text-muted-foreground">
            Format string for the directory display
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="home_symbol">Home Symbol</Label>
          <Input
            id="home_symbol"
            {...register('home_symbol')}
            placeholder="~"
            disabled={disabled}
          />
          <p className="text-xs text-muted-foreground">
            Symbol used to represent the home directory
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="read_only">Read-Only Symbol</Label>
          <Input
            id="read_only"
            {...register('read_only')}
            placeholder="🔒"
            disabled={disabled}
          />
          <p className="text-xs text-muted-foreground">
            Symbol shown for read-only directories
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="read_only_style">Read-Only Style</Label>
          <Input
            id="read_only_style"
            {...register('read_only_style')}
            placeholder="red"
            disabled={disabled}
          />
          <p className="text-xs text-muted-foreground">
            Style for the read-only indicator
          </p>
        </div>
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
}
