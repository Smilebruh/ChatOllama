// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
// use surrealdb::{Sureal, engine::local::RocksDb} ;
use tauri_plugin_shell::process::{Command, CommandEvent};

// #[tauri::command]
// fn ollama_api(app: tauri::AppHandle) {
//    let (mut rx, mut child) = Command::new_sidecar("ollama_api")
//    .except("failed to create sidecar")
//    .spawn()
//    .except("failed to spawn");

//    tauri::async_runtime::spawn(async move {
//     while let Some(event) = rx.recv().await {
//         if let CommandEvent::Stdout(line) = event {
//             window
//                 .emit("message", Some(format!("{}",line)))
//                 .except("failed to emit event");

//             child.write("message from ollama_api".as_bytes()).unwrap();
//         }
//     }
//    });
// }

// #[tauri::command]
// async fn ollama_api(app: tauri::AppHandle) -> Result<(), String> {
//     let sidecar = app.shell().sidecar("ollama_api").map_err(|e| e.to_string())?;
//     let (mut rx, mut child) = sidecar.spawn().map_err(|e| e.to_string())?;

//     tauri::async_runtime::spawn(async move {
//         while let Some(event) = rx.recv().await {
//             if let tauri_plugin_shell::process::CommandEvent::Stdout(output) = event {
//                 println!("Output: {}", String::from_utf8_lossy(&output));
//             }
//         }
//     });

//     let status = child.wait().await.map_err(|e| e.to_string())?;
//     println!("Exited with: {}", status.code().unwrap_or(-1));

//     Ok(())
// }


#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_websocket::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
