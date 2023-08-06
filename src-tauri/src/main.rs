// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn download(url: &str) -> Result<String, String> {
    let path_to_video = rustube::download_best_quality(url).await.unwrap();
    println!("downloaded: {} to {:?}", url, path_to_video);
    if path_to_video.is_file() {
        println!("here");
        return Ok(format!("downloaded: {} to {:?}", url, path_to_video));
    }
    return Err(format!("failed to download: {}", url));
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![download])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
