// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::str::FromStr;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn download(url: &str) -> Result<String, String> {
    let path = tauri::api::path::download_dir().unwrap();

    let url = rustube::url::Url::from_str(url).unwrap();

    let video = rustube::Video::from_url(&url)
        .await
        .unwrap()
        .best_audio()
        .unwrap()
        .download_to_dir(path)
        .await
        .unwrap();

    return Ok(format!("Downloaded video: {:?}", video));
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![download])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
