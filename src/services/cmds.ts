import { invoke } from '@tauri-apps/api/core';
import type { Settings, StarshipConfig } from '@/types';

export async function getSettings(): Promise<Settings> {
  return invoke<Settings>('get_settings');
}

export async function updateSettings(payload: Settings): Promise<void> {
  return invoke<void>('update_settings', { payload });
}

export async function getConfigList(): Promise<StarshipConfig[]> {
  return invoke<StarshipConfig[]>('get_config_list');
}

export async function getConfigContent(configId: string): Promise<string> {
  return invoke<string>('get_config_content', { configId });
}

export async function saveConfigContent(configId: string, content: string): Promise<void> {
  return invoke<void>('save_config_content', { configId, content });
}

export async function createBackup(configId: string): Promise<string> {
  return invoke<string>('create_backup', { configId });
}

export async function restoreBackup(configId: string, backupPath: string): Promise<void> {
  return invoke<void>('restore_backup', { configId, backupPath });
}
