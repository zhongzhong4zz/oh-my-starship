import { useState, useEffect } from 'react';
import { Save, RotateCcw, History } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useStarshipToml, useSaveStarshipToml, useBackupList, useRestoreFromBackup } from '@/lib/query';

export function TomlEditor() {
  const { t } = useTranslation();
  const { data: tomlContent, isLoading } = useStarshipToml();
  const saveToml = useSaveStarshipToml();
  const { data: backups } = useBackupList();
  const restoreBackup = useRestoreFromBackup();

  const [content, setContent] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [showBackups, setShowBackups] = useState(false);

  useEffect(() => {
    if (tomlContent !== undefined) {
      setContent(tomlContent);
      setHasChanges(false);
    }
  }, [tomlContent]);

  const handleContentChange = (value: string) => {
    setContent(value);
    setHasChanges(value !== tomlContent);
  };

  const handleSave = async () => {
    try {
      await saveToml.mutateAsync(content);
      setHasChanges(false);
      toast.success(t('starship.toml.saveSuccess'));
    } catch {
      toast.error(t('starship.toml.saveFailed'));
    }
  };

  const handleReset = () => {
    if (tomlContent !== undefined) {
      setContent(tomlContent);
      setHasChanges(false);
    }
  };

  const handleRestoreBackup = async (backupPath: string) => {
    try {
      await restoreBackup.mutateAsync(backupPath);
      setShowBackups(false);
      toast.success(t('starship.toml.restoreSuccess'));
    } catch {
      toast.error(t('starship.toml.restoreFailed'));
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-muted-foreground">{t('common.loading')}</span>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-140px)] flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowBackups(!showBackups)}>
            <History className="mr-2 h-4 w-4" />
            {t('starship.toml.backups')} ({backups?.length || 0})
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleReset} disabled={!hasChanges}>
            <RotateCcw className="mr-2 h-4 w-4" />
            {t('common.reset')}
          </Button>
          <Button size="sm" onClick={handleSave} disabled={!hasChanges || saveToml.isPending}>
            <Save className="mr-2 h-4 w-4" />
            {t('common.save')}
          </Button>
        </div>
      </div>

      {showBackups && backups && backups.length > 0 && (
        <div className="rounded-lg border border-border bg-card p-3">
          <h4 className="mb-2 text-sm font-medium">{t('starship.toml.availableBackups')}</h4>
          <div className="max-h-32 space-y-1 overflow-y-auto">
            {backups.map((backup) => (
              <button
                key={backup}
                onClick={() => handleRestoreBackup(backup)}
                className="w-full rounded px-2 py-1 text-left text-xs hover:bg-accent"
              >
                {backup.split(/[/\\]/).pop()}
              </button>
            ))}
          </div>
        </div>
      )}

      <textarea
        value={content}
        onChange={(e) => handleContentChange(e.target.value)}
        className="flex-1 resize-none rounded-lg border border-input bg-background p-4 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        spellCheck={false}
        placeholder={t('starship.toml.placeholder')}
      />
    </div>
  );
}
