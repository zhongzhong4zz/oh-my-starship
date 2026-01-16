import { Check, Palette } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { presets } from '@/lib/presets';
import { useApplyPreset, useStarshipToml } from '@/lib/query';
import { cn } from '@/lib/utils';

export function PresetSelector() {
  const { data: currentToml } = useStarshipToml();
  const applyPreset = useApplyPreset();

  const handleApplyPreset = async (presetId: string) => {
    const preset = presets.find((p) => p.id === presetId);
    if (!preset) return;

    try {
      await applyPreset.mutateAsync(preset.toml);
      toast.success(`Applied "${preset.name}" preset`);
    } catch {
      toast.error('Failed to apply preset');
    }
  };

  const isPresetActive = (presetToml: string) => {
    if (!currentToml) return false;
    const normalizedCurrent = currentToml.trim().replace(/\r\n/g, '\n');
    const normalizedPreset = presetToml.trim().replace(/\r\n/g, '\n');
    return normalizedCurrent === normalizedPreset;
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Choose a preset to quickly configure your Starship prompt. Your current configuration will
        be backed up automatically.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {presets.map((preset) => {
          const isActive = isPresetActive(preset.toml);

          return (
            <div
              key={preset.id}
              className={cn(
                'group relative flex flex-col rounded-lg border bg-card p-4 transition-colors',
                isActive ? 'border-primary' : 'border-border hover:border-primary/50'
              )}
            >
              <div className="mb-3 flex items-center gap-2">
                <Palette className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-medium">{preset.name}</h3>
                {isActive && <Check className="ml-auto h-4 w-4 text-primary" />}
              </div>

              <p className="mb-4 flex-1 text-sm text-muted-foreground">{preset.description}</p>

              <Button
                variant={isActive ? 'secondary' : 'default'}
                size="sm"
                onClick={() => handleApplyPreset(preset.id)}
                disabled={applyPreset.isPending || isActive}
                className="w-full"
              >
                {isActive ? 'Active' : 'Apply'}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
