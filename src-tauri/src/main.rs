// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::AppHandle;
use tauri::Manager;

#[tauri::command]
fn redirect(url: String, app_handle: AppHandle) {
    let window = app_handle.get_window("tv").unwrap();
    window.show();

    let eval_string: String = format!("window.location.replace('{}')", url);

    window.eval(&eval_string);
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_positioner::init())
        .invoke_handler(tauri::generate_handler![redirect])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
