#!/usr/bin/bash

alias arc="rustc -vV | grep host | sed 's/host: //g'";

pyinstaller --onefile --name ollama_api-$(arc) src-python/main.py --exclude-module PyQt6 --exclude-module PySide6;
mv dist/ollama_api-$(arc) src-tauri/binaries/ollama_api-$(arc)