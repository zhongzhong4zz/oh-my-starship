import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useStarshipToml, useSaveStarshipToml } from '@/lib/query';
import { parseTomlSection, updateTomlSection } from '../toml-utils';

interface CharacterFormData {
  success_symbol: string;
  error_symbol: string;
  vimcmd_symbol: string;
  vimcmd_replace_symbol: string;
  vimcmd_visual_symbol: string;
  style: string;
  disabled: boolean;
}

const defaults: CharacterFormData = {
  success_symbol: '[❯](bold green)',
  error_symbol: '[❯](bold red)',
  vimcmd_symbol: '[❮](bold green)',
  vimcmd_replace_symbol: '[❮](bold purple)',
  vimcmd_visual_symbol: '[❮](bold yellow)',
  style: 'bold white',
  disabled: false,
};

export function CharacterModule() {
  const { data: toml, isLoading } = useStarshipToml();
  const { mutate: saveToml, isPending } = useSaveStarshipToml();

  const { register, handleSubmit, reset, watch, setValue } = useForm<CharacterFormData>({
    defaultValues: defaults,
  });

  const disabled = watch('disabled');

  useEffect(() => {
    if (toml) {
      const section = parseTomlSection<CharacterFormData>(toml, 'character');
      reset({ ...defaults, ...section });
    }
  }, [toml, reset]);

  const onSubmit = (data: CharacterFormData) => {
    if (!toml) return;

    const updatedToml = updateTomlSection(toml, 'character', data);
    saveToml(updatedToml, {
      onSuccess: () => toast.success('Character module saved'),
      onError: (error) => toast.error(`Failed to save: ${error.message}`),
    });
  };

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Character Module</h3>
        <p className="text-sm text-muted-foreground">
          Configure the prompt character that appears at the beginning of your prompt.
        </p>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-border p-4">
        <div className="space-y-0.5">
          <Label htmlFor="disabled">Hide Character</Label>
          <p className="text-xs text-muted-foreground">Hide the character module from your prompt</p>
        </div>
        <Switch
          id="disabled"
          checked={disabled}
          onCheckedChange={(checked) => setValue('disabled', checked)}
        />
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="success_symbol">Success Symbol</Label>
          <Input
            id="success_symbol"
            {...register('success_symbol')}
            placeholder="[❯](bold green)"
            disabled={disabled}
          />
          <p className="text-xs text-muted-foreground">
            Symbol shown when the previous command succeeded
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="error_symbol">Error Symbol</Label>
          <Input
            id="error_symbol"
            {...register('error_symbol')}
            placeholder="[❯](bold red)"
            disabled={disabled}
          />
          <p className="text-xs text-muted-foreground">
            Symbol shown when the previous command failed
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vimcmd_symbol">Vim Command Symbol</Label>
          <Input
            id="vimcmd_symbol"
            {...register('vimcmd_symbol')}
            placeholder="[❮](bold green)"
            disabled={disabled}
          />
          <p className="text-xs text-muted-foreground">
            Symbol shown in vim normal mode
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vimcmd_replace_symbol">Vim Replace Symbol</Label>
          <Input
            id="vimcmd_replace_symbol"
            {...register('vimcmd_replace_symbol')}
            placeholder="[❮](bold purple)"
            disabled={disabled}
          />
          <p className="text-xs text-muted-foreground">
            Symbol shown in vim replace mode
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vimcmd_visual_symbol">Vim Visual Symbol</Label>
          <Input
            id="vimcmd_visual_symbol"
            {...register('vimcmd_visual_symbol')}
            placeholder="[❮](bold yellow)"
            disabled={disabled}
          />
          <p className="text-xs text-muted-foreground">
            Symbol shown in vim visual mode
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="style">Style</Label>
          <Input
            id="style"
            {...register('style')}
            placeholder="bold white"
            disabled={disabled}
          />
          <p className="text-xs text-muted-foreground">
            Style for the character (e.g., bold green, #ff0000)
          </p>
        </div>
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
}
