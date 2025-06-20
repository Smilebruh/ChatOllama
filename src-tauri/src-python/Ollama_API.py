from flask import Flask
from flask_socketio import SocketIO, emit

app = Flask(__name__)
sockIO = SocketIO(app)

def start_server():
    global app
    app.run(debug=True, port=11435)

@app.route('/')
def test():
    return "<h1>hello world </h1>"
# @sockIO.on("message")

start_server()