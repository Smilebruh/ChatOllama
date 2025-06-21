// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Arc;

use tauri_plugin_shell::ShellExt;
use tauri_plugin_shell::process::CommandEvent;

#[tauri::command]
async fn ollama_api() ->  Result<(), String>{
    let sidecar = &tauri::AppHandle::current()
        .shell()
        .sidecar("ollama_api")
        .map_err(|e| e.to_string())?;

    let (_rx, mut child) = sidecar.spawn().map_err(|e| e.to_string())?;

    let status = child.wait().except("error")?;
    println!("{}",status);
    Ok(())
}

fn main() {
    chatollama_lib::run()
}
