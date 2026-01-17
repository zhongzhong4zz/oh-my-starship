import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PresetSelector } from './preset-selector';
import { ModuleEditor } from './module-editor';
import { TomlEditor } from './toml-editor';

export function Component() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('presets');

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t('starship.title')}</h2>
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
