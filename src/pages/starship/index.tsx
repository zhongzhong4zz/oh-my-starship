import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PresetSelector } from './preset-selector';
import { ModuleEditor } from './module-editor';
import { TomlEditor } from './toml-editor';

export function Component() {
  const [activeTab, setActiveTab] = useState('presets');

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Starship Configuration</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList>
          <TabsTrigger value="presets">Presets</TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="toml">TOML Editor</TabsTrigger>
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
