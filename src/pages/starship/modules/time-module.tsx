import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useStarshipToml, useSaveStarshipToml } from '@/lib/query';
import { parseTomlSection, updateTomlSection } from '../toml-utils';

interface TimeFormData {
  disabled: boolean;
  time_format: string;
  format: string;
  style: string;
  use_12hr: boolean;
}

const defaults: TimeFormData = {
  disabled: true,
  time_format: '%T',
  format: '[$time]($style) ',
  style: 'bold yellow',
  use_12hr: false,
};

const timeFormatExamples = [
  { label: '24-hour (14:30:00)', value: '%T' },
  { label: '12-hour (02:30:00 PM)', value: '%r' },
  { label: 'Hour:Minute (14:30)', value: '%R' },
  { label: 'Custom (2:30 PM)', value: '%-I:%M %p' },
];

export function TimeModule() {
  const { data: toml, isLoading } = useStarshipToml();
  const { mutate: saveToml, isPending } = useSaveStarshipToml();

  const { register, handleSubmit, reset, watch, setValue } = useForm<TimeFormData>({
    defaultValues: defaults,
  });

  const disabled = watch('disabled');

  useEffect(() => {
    if (toml) {
      const section = parseTomlSection<TimeFormData>(toml, 'time');
      reset({ ...defaults, ...section });
    }
  }, [toml, reset]);

  const onSubmit = (data: TimeFormData) => {
    if (!toml) return;

    const updatedToml = updateTomlSection(toml, 'time', data);
    saveToml(updatedToml, {
      onSuccess: () => toast.success('Time module saved'),
      onError: (error) => toast.error(`Failed to save: ${error.message}`),
    });
  };

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Time Module</h3>
        <p className="text-sm text-muted-foreground">
          Configure the time display in your prompt.
        </p>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-border p-4">
        <div className="space-y-0.5">
          <Label htmlFor="disabled">Disable Module</Label>
          <p className="text-xs text-muted-foreground">
            The time module is disabled by default. Enable it to show the current time.
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
          <Label htmlFor="time_format">Time Format</Label>
          <Input
            id="time_format"
            {...register('time_format')}
            placeholder="%T"
            disabled={disabled}
          />
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Format string using strftime syntax. Common formats:</p>
            <ul className="list-inside list-disc ml-2">
              {timeFormatExamples.map((example) => (
                <li key={example.value}>
                  <code className="bg-muted px-1 rounded">{example.value}</code> - {example.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="format">Display Format</Label>
          <Input
            id="format"
            {...register('format')}
            placeholder="[$time]($style) "
            disabled={disabled}
          />
          <p className="text-xs text-muted-foreground">
            Format string for the time display. Use $time for the formatted time.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="style">Style</Label>
          <Input
            id="style"
            {...register('style')}
            placeholder="bold yellow"
            disabled={disabled}
          />
          <p className="text-xs text-muted-foreground">
            Style for the time display (e.g., bold yellow, #ff0000)
          </p>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="use_12hr">Use 12-Hour Format</Label>
            <p className="text-xs text-muted-foreground">
              Use 12-hour time format with AM/PM
            </p>
          </div>
          <Switch
            id="use_12hr"
            checked={watch('use_12hr')}
            onCheckedChange={(checked) => setValue('use_12hr', checked)}
            disabled={disabled}
          />
        </div>
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
}
