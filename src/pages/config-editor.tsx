import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui';
import { useConfigContent, useSaveConfig, useCreateBackup } from '@/lib/query';

export function Component() {
  const { t } = useTranslation();
  const { configId } = useParams<{ configId: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const { data: originalContent, isLoading } = useConfigContent(configId!);
  const saveConfig = useSaveConfig();
  const createBackup = useCreateBackup();

  useEffect(() => {
    if (originalContent !== undefined) {
      setContent(originalContent);
      setHasChanges(false);
    }
  }, [originalContent]);

  const handleContentChange = (value: string) => {
    setContent(value);
    setHasChanges(value !== originalContent);
  };

  const handleSave = async () => {
    if (!configId) return;

    try {
      await createBackup.mutateAsync(configId);
      await saveConfig.mutateAsync({ configId, content });
      setHasChanges(false);
      toast.success(t('configEditor.saveSuccess'));
    } catch (error) {
      toast.error(t('configEditor.saveFailed'));
    }
  };

  const handleReset = () => {
    if (originalContent !== undefined) {
      setContent(originalContent);
      setHasChanges(false);
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
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('common.back')}
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={!hasChanges}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            {t('common.reset')}
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={!hasChanges || saveConfig.isPending}
          >
            <Save className="mr-2 h-4 w-4" />
            {t('common.save')}
          </Button>
        </div>
      </div>
      <textarea
        value={content}
        onChange={(e) => handleContentChange(e.target.value)}
        className="flex-1 resize-none rounded-lg border border-input bg-background p-4 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        spellCheck={false}
      />
    </div>
  );
}
