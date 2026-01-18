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

export async function getStarshipToml(): Promise<string> {
  return invoke<string>('get_starship_toml');
}

export async function saveStarshipToml(content: string): Promise<void> {
  return invoke<void>('save_starship_toml', { content });
}

export async function applyPreset(tomlContent: string): Promise<void> {
  return invoke<void>('apply_preset', { tomlContent });
}

export async function getBackupList(): Promise<string[]> {
  return invoke<string[]>('get_backup_list');
}

export async function restoreFromBackup(backupPath: string): Promise<void> {
  return invoke<void>('restore_from_backup', { backupPath });
}

export async function deleteBackup(backupPath: string): Promise<void> {
  return invoke<void>('delete_backup', { backupPath });
}
