import { useEffect } from 'react';
import { applyTheme } from '@/lib/utils';
import type { Theme } from '@/types';

export function useTheme(theme: Theme) {
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);
}
