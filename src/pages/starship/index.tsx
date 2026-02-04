import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArchiveRestore } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { setBackupName } from '@/lib/backup-names';
import { useCreateStarshipBackup } from '@/lib/query';
import { PresetSelector } from './preset-selector';
import { ModuleEditor } from './module-editor';
import { TomlEditor } from './toml-editor';

export function Component() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('presets');
  const { mutate: createBackup, isPending } = useCreateStarshipBackup();
  const [nameDialogOpen, setNameDialogOpen] = useState(false);
  const [backupName, setBackupNameInput] = useState('');
  const canSaveName = backupName.trim().length > 0;

  const handleCreateBackup = () => {
    if (!canSaveName) return;
    createBackup(undefined, {
      onSuccess: (backupPath) => {
        setBackupName(backupPath, backupName);
        toast.success(t('starship.backupSuccess'));
        setNameDialogOpen(false);
        setBackupNameInput('');
      },
      onError: (error) => {
        toast.error(t('starship.backupError', { error: error.message }));
      },
    });
  };

  const openNameDialog = () => {
    setBackupNameInput('');
    setNameDialogOpen(true);
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t('starship.title')}</h2>
        <Button variant="outline" size="sm" onClick={openNameDialog} disabled={isPending}>
          <ArchiveRestore className="mr-2 h-4 w-4" />
          {t('starship.backup')}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList>
          <TabsTrigger value="presets">{t('starship.tabs.presets')}</TabsTrigger>
          <TabsTrigger value="modules">{t('starship.tabs.modules')}</TabsTrigger>
          <TabsTrigger value="toml">{t('starship.tabs.toml')}</TabsTrigger>
        </TabsList>

        <TabsContent value="presets" className="mt-4 flex-1">
          <PresetSelector />
        </TabsContent>

        <TabsContent value="modules" className="mt-4 flex-1">
          <ModuleEditor />
        </TabsContent>

        <TabsContent value="toml" className="mt-4 flex-1">
          <TomlEditor />
        </TabsContent>
      </Tabs>

      <Dialog open={nameDialogOpen} onOpenChange={setNameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('backups.nameTitle')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="backup-name">{t('backups.nameLabel')}</Label>
              <Input
                id="backup-name"
                value={backupName}
                onChange={(e) => setBackupNameInput(e.target.value)}
                placeholder={t('backups.namePlaceholder')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && canSaveName) {
                    handleCreateBackup();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNameDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleCreateBackup} disabled={isPending || !canSaveName}>
              {t('common.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

