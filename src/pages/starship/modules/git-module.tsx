import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStarshipToml, useSaveStarshipToml } from '@/lib/query';
import { parseTomlSection, updateTomlSection } from '../toml-utils';

interface GitBranchFormData {
  symbol: string;
  style: string;
  format: string;
  truncation_length: number;
  truncation_symbol: string;
  disabled: boolean;
}

interface GitStatusFormData {
  style: string;
  format: string;
  ahead: string;
  behind: string;
  diverged: string;
  conflicted: string;
  untracked: string;
  stashed: string;
  modified: string;
  staged: string;
  renamed: string;
  deleted: string;
  disabled: boolean;
}

const branchDefaults: GitBranchFormData = {
  symbol: ' ',
  style: 'bold purple',
  format: '[$symbol$branch(:$remote_branch)]($style) ',
  truncation_length: 9999,
  truncation_symbol: '…',
  disabled: false,
};

const statusDefaults: GitStatusFormData = {
  style: 'bold red',
  format: '([$all_status$ahead_behind]($style)) ',
  ahead: '⇡${count}',
  behind: '⇣${count}',
  diverged: '⇕⇡${ahead_count}⇣${behind_count}',
  conflicted: '=${count}',
  untracked: '?${count}',
  stashed: '$${count}',
  modified: '!${count}',
  staged: '+${count}',
  renamed: '»${count}',
  deleted: '✘${count}',
  disabled: false,
};

export function GitModule() {
  const [activeTab, setActiveTab] = useState('branch');
  const { data: toml, isLoading } = useStarshipToml();
  const { mutate: saveToml, isPending } = useSaveStarshipToml();

  const branchForm = useForm<GitBranchFormData>({ defaultValues: branchDefaults });
  const statusForm = useForm<GitStatusFormData>({ defaultValues: statusDefaults });

  useEffect(() => {
    if (toml) {
      const branchSection = parseTomlSection<GitBranchFormData>(toml, 'git_branch');
      const statusSection = parseTomlSection<GitStatusFormData>(toml, 'git_status');
      branchForm.reset({ ...branchDefaults, ...branchSection });
      statusForm.reset({ ...statusDefaults, ...statusSection });
    }
  }, [toml, branchForm, statusForm]);

  const onBranchSubmit = (data: GitBranchFormData) => {
    if (!toml) return;

    const updatedToml = updateTomlSection(toml, 'git_branch', data);
    saveToml(updatedToml, {
      onSuccess: () => toast.success('Git branch module saved'),
      onError: (error) => toast.error(`Failed to save: ${error.message}`),
    });
  };

  const onStatusSubmit = (data: GitStatusFormData) => {
    if (!toml) return;

    const updatedToml = updateTomlSection(toml, 'git_status', data);
    saveToml(updatedToml, {
      onSuccess: () => toast.success('Git status module saved'),
      onError: (error) => toast.error(`Failed to save: ${error.message}`),
    });
  };

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Git Module</h3>
        <p className="text-sm text-muted-foreground">
          Configure how git information is displayed in your prompt.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="branch">Git Branch</TabsTrigger>
          <TabsTrigger value="status">Git Status</TabsTrigger>
        </TabsList>

        <TabsContent value="branch" className="mt-4">
          <form onSubmit={branchForm.handleSubmit(onBranchSubmit)} className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="branch-disabled">Disable Module</Label>
                <p className="text-xs text-muted-foreground">Hide git branch from your prompt</p>
              </div>
              <Switch
                id="branch-disabled"
                checked={branchForm.watch('disabled')}
                onCheckedChange={(checked) => branchForm.setValue('disabled', checked)}
              />
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="branch-symbol">Symbol</Label>
                <Input
                  id="branch-symbol"
                  {...branchForm.register('symbol')}
                  placeholder=" "
                  disabled={branchForm.watch('disabled')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="branch-style">Style</Label>
                <Input
                  id="branch-style"
                  {...branchForm.register('style')}
                  placeholder="bold purple"
                  disabled={branchForm.watch('disabled')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="branch-format">Format</Label>
                <Input
                  id="branch-format"
                  {...branchForm.register('format')}
                  placeholder="[$symbol$branch(:$remote_branch)]($style) "
                  disabled={branchForm.watch('disabled')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="branch-truncation_length">Truncation Length</Label>
                <Input
                  id="branch-truncation_length"
                  type="number"
                  {...branchForm.register('truncation_length', { valueAsNumber: true })}
                  placeholder="9999"
                  disabled={branchForm.watch('disabled')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="branch-truncation_symbol">Truncation Symbol</Label>
                <Input
                  id="branch-truncation_symbol"
                  {...branchForm.register('truncation_symbol')}
                  placeholder="…"
                  disabled={branchForm.watch('disabled')}
                />
              </div>
            </div>

            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save Git Branch'}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="status" className="mt-4">
          <form onSubmit={statusForm.handleSubmit(onStatusSubmit)} className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="status-disabled">Disable Module</Label>
                <p className="text-xs text-muted-foreground">Hide git status from your prompt</p>
              </div>
              <Switch
                id="status-disabled"
                checked={statusForm.watch('disabled')}
                onCheckedChange={(checked) => statusForm.setValue('disabled', checked)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="status-style">Style</Label>
                <Input
                  id="status-style"
                  {...statusForm.register('style')}
                  placeholder="bold red"
                  disabled={statusForm.watch('disabled')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status-format">Format</Label>
                <Input
                  id="status-format"
                  {...statusForm.register('format')}
                  placeholder="([$all_status$ahead_behind]($style)) "
                  disabled={statusForm.watch('disabled')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status-ahead">Ahead</Label>
                <Input
                  id="status-ahead"
                  {...statusForm.register('ahead')}
                  placeholder="⇡${count}"
                  disabled={statusForm.watch('disabled')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status-behind">Behind</Label>
                <Input
                  id="status-behind"
                  {...statusForm.register('behind')}
                  placeholder="⇣${count}"
                  disabled={statusForm.watch('disabled')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status-diverged">Diverged</Label>
                <Input
                  id="status-diverged"
                  {...statusForm.register('diverged')}
                  placeholder="⇕⇡${ahead_count}⇣${behind_count}"
                  disabled={statusForm.watch('disabled')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status-conflicted">Conflicted</Label>
                <Input
                  id="status-conflicted"
                  {...statusForm.register('conflicted')}
                  placeholder="=${count}"
                  disabled={statusForm.watch('disabled')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status-untracked">Untracked</Label>
                <Input
                  id="status-untracked"
                  {...statusForm.register('untracked')}
                  placeholder="?${count}"
                  disabled={statusForm.watch('disabled')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status-stashed">Stashed</Label>
                <Input
                  id="status-stashed"
                  {...statusForm.register('stashed')}
                  placeholder="$${count}"
                  disabled={statusForm.watch('disabled')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status-modified">Modified</Label>
                <Input
                  id="status-modified"
                  {...statusForm.register('modified')}
                  placeholder="!${count}"
                  disabled={statusForm.watch('disabled')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status-staged">Staged</Label>
                <Input
                  id="status-staged"
                  {...statusForm.register('staged')}
                  placeholder="+${count}"
                  disabled={statusForm.watch('disabled')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status-renamed">Renamed</Label>
                <Input
                  id="status-renamed"
                  {...statusForm.register('renamed')}
                  placeholder="»${count}"
                  disabled={statusForm.watch('disabled')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status-deleted">Deleted</Label>
                <Input
                  id="status-deleted"
                  {...statusForm.register('deleted')}
                  placeholder="✘${count}"
                  disabled={statusForm.watch('disabled')}
                />
              </div>
            </div>

            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save Git Status'}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
