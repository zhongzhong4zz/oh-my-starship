import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getConfigList,
  getConfigContent,
  saveConfigContent,
  createBackup,
} from '@/services/cmds';

export const queryKeys = {
  configList: ['configList'] as const,
  configContent: (id: string) => ['configContent', id] as const,
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
