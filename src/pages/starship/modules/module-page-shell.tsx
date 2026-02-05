import type { ReactNode } from 'react';

export function ModulePageShell({ children }: { children: ReactNode }) {
  return (
    <div className="h-[calc(100vh-140px)] overflow-y-auto rounded-xl border border-border bg-card p-5 shadow-sm">
      {children}
    </div>
  );
}
