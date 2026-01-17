import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
      onSuccess: () => toast.success(t('starship.modules.character.saveSuccess')),
      onError: (error) => toast.error(t('starship.modules.saveFailed', { message: error.message })),
    });
  };

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">{t('common.loading')}</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('starship.modules.character.title')}</h3>
        <p className="text-sm text-muted-foreground">
          {t('starship.modules.character.subtitle')}
        </p>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-border p-4">
        <div className="space-y-0.5">
          <Label htmlFor="disabled">{t('starship.modules.character.hideCharacter')}</Label>
          <p className="text-xs text-muted-foreground">{t('starship.modules.character.hideDescription')}</p>
        </div>
        <Switch
          id="disabled"
          checked={disabled}
          onCheckedChange={(checked) => setValue('disabled', checked)}
        />
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="success_symbol">{t('starship.modules.character.successSymbol')}</Label>
          <Input
            id="success_symbol"
            {...register('success_symbol')}
            placeholder="[❯](bold green)"
            disabled={disabled}
          />
          <p className="text-xs text-muted-foreground">
            {t('starship.modules.character.successSymbolDesc')}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="error_symbol">{t('starship.modules.character.errorSymbol')}</Label>
          <Input
            id="error_symbol"
            {...register('error_symbol')}
            placeholder="[❯](bold red)"
            disabled={disabled}
          />
          <p className="text-xs text-muted-foreground">
            {t('starship.modules.character.errorSymbolDesc')}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vimcmd_symbol">{t('starship.modules.character.vimcmdSymbol')}</Label>
          <Input
            id="vimcmd_symbol"
            {...register('vimcmd_symbol')}
            placeholder="[❮](bold green)"
            disabled={disabled}
          />
          <p className="text-xs text-muted-foreground">
            {t('starship.modules.character.vimcmdSymbolDesc')}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vimcmd_replace_symbol">{t('starship.modules.character.vimcmdReplaceSymbol')}</Label>
          <Input
            id="vimcmd_replace_symbol"
            {...register('vimcmd_replace_symbol')}
            placeholder="[❮](bold purple)"
            disabled={disabled}
          />
          <p className="text-xs text-muted-foreground">
            {t('starship.modules.character.vimcmdReplaceSymbolDesc')}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vimcmd_visual_symbol">{t('starship.modules.character.vimcmdVisualSymbol')}</Label>
          <Input
            id="vimcmd_visual_symbol"
            {...register('vimcmd_visual_symbol')}
            placeholder="[❮](bold yellow)"
            disabled={disabled}
          />
          <p className="text-xs text-muted-foreground">
            {t('starship.modules.character.vimcmdVisualSymbolDesc')}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="style">{t('starship.modules.character.style')}</Label>
          <Input
            id="style"
            {...register('style')}
            placeholder="bold white"
            disabled={disabled}
          />
          <p className="text-xs text-muted-foreground">
            {t('starship.modules.character.styleDesc')}
          </p>
        </div>
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? t('common.saving') : t('common.saveChanges')}
      </Button>
    </form>
  );
}
