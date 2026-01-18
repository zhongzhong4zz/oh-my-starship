use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use chrono::Utc;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Settings {
    pub theme: String,
    pub language: String,
}

impl Default for Settings {
    fn default() -> Self {
        Self {
            theme: "light".to_string(),
            language: "en".to_string(),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct StarshipConfig {
    pub id: String,
    pub name: String,
    pub path: String,
    pub is_enterprise: bool,
    pub created_at: String,
    pub updated_at: String,
}

fn get_config_dir() -> PathBuf {
    dirs::config_dir()
        .unwrap_or_else(|| PathBuf::from("."))
        .join("starship-config-manager")
}

fn get_settings_path() -> PathBuf {
    get_config_dir().join("settings.json")
}

fn get_starship_config_path() -> PathBuf {
    dirs::home_dir()
        .unwrap_or_else(|| PathBuf::from("."))
        .join(".config")
        .join("starship.toml")
}

#[tauri::command]
pub async fn get_settings() -> Result<Settings, String> {
    let path = get_settings_path();

    if !path.exists() {
        let settings = Settings::default();
        let dir = path.parent().unwrap();
        fs::create_dir_all(dir).map_err(|e| e.to_string())?;
        let json = serde_json::to_string_pretty(&settings).map_err(|e| e.to_string())?;
        fs::write(&path, json).map_err(|e| e.to_string())?;
        return Ok(settings);
    }

    let content = fs::read_to_string(&path).map_err(|e| e.to_string())?;
    let settings: Settings = serde_json::from_str(&content).map_err(|e| e.to_string())?;
    Ok(settings)
}

#[tauri::command]
pub async fn update_settings(payload: Settings) -> Result<(), String> {
    let path = get_settings_path();
    let dir = path.parent().unwrap();
    fs::create_dir_all(dir).map_err(|e| e.to_string())?;

    let json = serde_json::to_string_pretty(&payload).map_err(|e| e.to_string())?;
    fs::write(&path, json).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub async fn get_config_list() -> Result<Vec<StarshipConfig>, String> {
    let mut configs = Vec::new();
    let path = get_starship_config_path();

    if path.exists() {
        let metadata = fs::metadata(&path).ok();
        let now = Utc::now().to_rfc3339();

        configs.push(StarshipConfig {
            id: "user".to_string(),
            name: "User Config".to_string(),
            path: path.to_string_lossy().to_string(),
            is_enterprise: false,
            created_at: metadata
                .as_ref()
                .and_then(|m| m.created().ok())
                .map(|t| chrono::DateTime::<Utc>::from(t).to_rfc3339())
                .unwrap_or_else(|| now.clone()),
            updated_at: metadata
                .and_then(|m| m.modified().ok())
                .map(|t| chrono::DateTime::<Utc>::from(t).to_rfc3339())
                .unwrap_or(now),
        });
    }

    Ok(configs)
}

#[tauri::command]
pub async fn get_config_content(config_id: String) -> Result<String, String> {
    let configs = get_config_list().await?;
    let config = configs
        .iter()
        .find(|c| c.id == config_id)
        .ok_or_else(|| "Config not found".to_string())?;

    fs::read_to_string(&config.path).map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn save_config_content(config_id: String, content: String) -> Result<(), String> {
    let configs = get_config_list().await?;
    let config = configs
        .iter()
        .find(|c| c.id == config_id)
        .ok_or_else(|| "Config not found".to_string())?;

    if config.is_enterprise {
        return Err("Cannot modify enterprise config".to_string());
    }

    fs::write(&config.path, content).map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn create_backup(config_id: String) -> Result<String, String> {
    let configs = get_config_list().await?;
    let config = configs
        .iter()
        .find(|c| c.id == config_id)
        .ok_or_else(|| "Config not found".to_string())?;

    let backup_dir = get_config_dir().join("backups");
    fs::create_dir_all(&backup_dir).map_err(|e| e.to_string())?;

    let timestamp = Utc::now().format("%Y%m%d_%H%M%S");
    let backup_name = format!("{}_{}.toml", config_id, timestamp);
    let backup_path = backup_dir.join(&backup_name);

    fs::copy(&config.path, &backup_path).map_err(|e| e.to_string())?;

    Ok(backup_path.to_string_lossy().to_string())
}

#[tauri::command]
pub async fn restore_backup(config_id: String, backup_path: String) -> Result<(), String> {
    let configs = get_config_list().await?;
    let config = configs
        .iter()
        .find(|c| c.id == config_id)
        .ok_or_else(|| "Config not found".to_string())?;

    if config.is_enterprise {
        return Err("Cannot modify enterprise config".to_string());
    }

    fs::copy(&backup_path, &config.path).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub async fn get_starship_toml() -> Result<String, String> {
    let path = get_starship_config_path();
    
    if !path.exists() {
        let dir = path.parent().unwrap();
        fs::create_dir_all(dir).map_err(|e| e.to_string())?;
        fs::write(&path, "").map_err(|e| e.to_string())?;
        return Ok(String::new());
    }
    
    fs::read_to_string(&path).map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn save_starship_toml(content: String) -> Result<(), String> {
    let path = get_starship_config_path();
    let dir = path.parent().unwrap();
    fs::create_dir_all(dir).map_err(|e| e.to_string())?;
    fs::write(&path, content).map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn apply_preset(toml_content: String) -> Result<(), String> {
    let path = get_starship_config_path();
    let backup_dir = get_config_dir().join("backups");
    fs::create_dir_all(&backup_dir).map_err(|e| e.to_string())?;

    if path.exists() {
        let timestamp = Utc::now().format("%Y%m%d_%H%M%S");
        let backup_name = format!("starship_before_preset_{}.toml", timestamp);
        let backup_path = backup_dir.join(&backup_name);
        fs::copy(&path, &backup_path).map_err(|e| e.to_string())?;
    }

    let dir = path.parent().unwrap();
    fs::create_dir_all(dir).map_err(|e| e.to_string())?;
    fs::write(&path, toml_content).map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_backup_list() -> Result<Vec<String>, String> {
    let backup_dir = get_config_dir().join("backups");
    
    if !backup_dir.exists() {
        return Ok(Vec::new());
    }
    
    let mut backups = Vec::new();
    let entries = fs::read_dir(&backup_dir).map_err(|e| e.to_string())?;
    
    for entry in entries {
        if let Ok(entry) = entry {
            if let Some(name) = entry.file_name().to_str() {
                if name.ends_with(".toml") {
                    backups.push(entry.path().to_string_lossy().to_string());
                }
            }
        }
    }
    
    backups.sort_by(|a, b| b.cmp(a));
    Ok(backups)
}

#[tauri::command]
pub async fn restore_from_backup(backup_path: String) -> Result<(), String> {
    let starship_path = get_starship_config_path();
    let dir = starship_path.parent().unwrap();
    fs::create_dir_all(dir).map_err(|e| e.to_string())?;
    fs::copy(&backup_path, &starship_path).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub async fn delete_backup(backup_path: String) -> Result<(), String> {
    let path = PathBuf::from(&backup_path);
    if path.exists() {
        fs::remove_file(&path).map_err(|e| e.to_string())?;
    }
    Ok(())
}
