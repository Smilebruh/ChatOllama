#!/usr/bin/bash

arc(){
    rustc -vV | grep host | sed 's/host: //g'
}


pyinstaller \
    --onefile \
    --name ollama_api-$(arc) \
    --additional-hooks-dir=src-python/pyinstaller_hooks \
    src-python/main.py \
    --exclude-module PyQt6 \
    --exclude-module PySide6 ;

mv dist/ollama_api-$(arc) src-tauri/binaries/ollama_api-$(arc)
