import { useState } from 'react';
import { Archive, ChevronDown, MousePointerClick, Pencil, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useBackupList, useRestoreFromBackup } from '@/lib/query';
import { deleteBackup } from '@/services/cmds';

const BACKUP_NAMES_KEY = 'starship-backup-names';

function getBackupNames(): Record<string, string> {
  try {
    const stored = localStorage.getItem(BACKUP_NAMES_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function setBackupName(backupPath: string, name: string): void {
  const names = getBackupNames();
  if (name.trim()) {
    names[backupPath] = name.trim();
  } else {
    delete names[backupPath];
  }
  localStorage.setItem(BACKUP_NAMES_KEY, JSON.stringify(names));
}

function formatBackupName(backupPath: string): string {
  const customName = getBackupNames()[backupPath];
  if (customName) return customName;

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

  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [renameTarget, setRenameTarget] = useState<string | null>(null);
  const [renameName, setRenameName] = useState('');
  const [, forceUpdate] = useState(0);

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

  const openRenameDialog = (backupPath: string) => {
    setRenameTarget(backupPath);
    setRenameName(getBackupNames()[backupPath] || '');
    setRenameDialogOpen(true);
  };

  const handleRename = () => {
    if (renameTarget) {
      setBackupName(renameTarget, renameName);
      toast.success(t('backups.renameSuccess'));
      setRenameDialogOpen(false);
      setRenameTarget(null);
      setRenameName('');
      forceUpdate((n) => n + 1);
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
                  <MousePointerClick className="text-primary" />
                  <span>{t('backups.apply')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openRenameDialog(backupPath)}>
                  <Pencil className="text-primary" />
                  <span>{t('backups.rename')}</span>
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

      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('backups.renameTitle')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="backup-name">{t('backups.nameLabel')}</Label>
              <Input
                id="backup-name"
                value={renameName}
                onChange={(e) => setRenameName(e.target.value)}
                placeholder={t('backups.namePlaceholder')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRename();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleRename}>{t('common.save')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
