import { Archive, ChevronDown, RotateCcw, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useBackupList, useRestoreFromBackup } from '@/lib/query';
import { deleteBackup } from '@/services/cmds';

function formatBackupName(backupPath: string): string {
  const fileName = backupPath.split(/[/\\]/).pop() || backupPath;
  const match = fileName.match(/starship_(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})\.toml/);
  if (match) {
    const [, year, month, day, hour, minute, second] = match;
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
  return fileName;
}

export function ConfigList() {
  const { t } = useTranslation();
  const { data: backups, isLoading, refetch } = useBackupList();
  const { mutate: restoreBackup, isPending: isRestoring } = useRestoreFromBackup();

  const handleRestore = (backupPath: string) => {
    restoreBackup(backupPath, {
      onSuccess: () => {
        toast.success(t('backups.applySuccess'));
      },
      onError: (error) => {
        toast.error(t('backups.applyError', { error: error.message }));
      },
    });
  };

  const handleDelete = async (backupPath: string) => {
    try {
      await deleteBackup(backupPath);
      toast.success(t('backups.deleteSuccess'));
      refetch();
    } catch (error) {
      toast.error(t('backups.deleteError', { error: (error as Error).message }));
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-muted-foreground">{t('common.loading')}</span>
      </div>
    );
  }

  if (!backups?.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <Archive className="h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground">{t('backups.noBackups')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{t('backups.title')}</h2>
      <div className="grid gap-3">
        {backups.map((backupPath) => (
          <div
            key={backupPath}
            className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
          >
            <div className="flex items-center gap-3">
              <Archive className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{formatBackupName(backupPath)}</p>
                <p className="text-sm text-muted-foreground">{backupPath}</p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" disabled={isRestoring}>
                  {t('backups.more')}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleRestore(backupPath)}>
                  <RotateCcw className="text-primary" />
                  <span>{t('backups.apply')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDelete(backupPath)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 />
                  <span>{t('backups.delete')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    </div>
  );
}
