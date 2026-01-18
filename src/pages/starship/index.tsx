import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArchiveRestore } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useCreateStarshipBackup } from '@/lib/query';
import { PresetSelector } from './preset-selector';
import { ModuleEditor } from './module-editor';
import { TomlEditor } from './toml-editor';

export function Component() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('presets');
  const { mutate: createBackup, isPending } = useCreateStarshipBackup();

  const handleCreateBackup = () => {
    createBackup(undefined, {
      onSuccess: () => {
        toast.success(t('starship.backupSuccess'));
      },
      onError: (error) => {
        toast.error(t('starship.backupError', { error: error.message }));
      },
    });
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t('starship.title')}</h2>
        <Button variant="outline" size="sm" onClick={handleCreateBackup} disabled={isPending}>
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
    </div>
  );
}
