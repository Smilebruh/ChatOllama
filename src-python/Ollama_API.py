from flask import Flask
from flask_socketio import emit, SocketIO

app = Flask(__name__)


sockIO = SocketIO(app)
def startServer():
    global app, sockIO
