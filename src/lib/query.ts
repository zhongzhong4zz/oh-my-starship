import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getConfigList,
  getConfigContent,
  saveConfigContent,
  createBackup,
  getStarshipToml,
  saveStarshipToml,
  applyPreset,
  getBackupList,
  restoreFromBackup,
} from '@/services/cmds';

export const queryKeys = {
  configList: ['configList'] as const,
  configContent: (id: string) => ['configContent', id] as const,
  starshipToml: ['starshipToml'] as const,
  backupList: ['backupList'] as const,
};

export function useConfigList() {
  return useQuery({
    queryKey: queryKeys.configList,
    queryFn: getConfigList,
  });
}

export function useConfigContent(configId: string) {
  return useQuery({
    queryKey: queryKeys.configContent(configId),
    queryFn: () => getConfigContent(configId),
    enabled: !!configId,
  });
}

export function useSaveConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ configId, content }: { configId: string; content: string }) =>
      saveConfigContent(configId, content),
    onSuccess: (_, { configId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.configContent(configId) });
    },
  });
}

export function useCreateBackup() {
  return useMutation({
    mutationFn: (configId: string) => createBackup(configId),
  });
}

export function useStarshipToml() {
  return useQuery({
    queryKey: queryKeys.starshipToml,
    queryFn: getStarshipToml,
  });
}

export function useSaveStarshipToml() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => saveStarshipToml(content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.starshipToml });
    },
  });
}

export function useApplyPreset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tomlContent: string) => applyPreset(tomlContent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.starshipToml });
      queryClient.invalidateQueries({ queryKey: queryKeys.backupList });
    },
  });
}

export function useBackupList() {
  return useQuery({
    queryKey: queryKeys.backupList,
    queryFn: getBackupList,
  });
}

export function useRestoreFromBackup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (backupPath: string) => restoreFromBackup(backupPath),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.starshipToml });
    },
  });
}
