import { useNavigate } from 'react-router-dom';
import { FileText, Lock } from 'lucide-react';
import { useConfigList } from '@/lib/query';
import { cn } from '@/lib/utils';

export function ConfigList() {
  const navigate = useNavigate();
  const { data: configs, isLoading } = useConfigList();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-muted-foreground">Loading...</span>
      </div>
    );
  }

  if (!configs?.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <FileText className="h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground">No configuration files found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Configuration Files</h2>
      <div className="grid gap-3">
        {configs.map((config) => (
          <button
            key={config.id}
            onClick={() => navigate(`/editor/${config.id}`)}
            className={cn(
              'flex items-center justify-between rounded-lg border border-border bg-card p-4 text-left transition-colors hover:bg-accent/50',
              config.isEnterprise && 'cursor-default'
            )}
          >
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{config.name}</p>
                <p className="text-sm text-muted-foreground">{config.path}</p>
              </div>
            </div>
            {config.isEnterprise && (
              <Lock className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
