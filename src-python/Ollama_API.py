from flask import Flask
from flask_socketio import SocketIO, emit
from Model import runModel
from engineio.async_drivers import eventlet

app = Flask(__name__)
socketio = SocketIO(app, async_mode='eventlet',cors_allowed_origins='*')

@app.route('/')
def index():
    return "ChatOllama ran on this port"

@socketio.on('chatToModel')
def run_model(model: str,message: str):
    for model_output in runModel(model, message):
        socketio.emit('modelMSG',model_output)
        socketio.sleep(0)

def start_server():
    global socketio
    socketio.run(app,debug=True, port=11435)