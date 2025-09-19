from flask import Flask, send_from_directory, redirect
import os

app = Flask(__name__, static_folder='static')

@app.route('/manifest.json')
def manifest():
    return send_from_directory('static', 'manifest.json')

@app.route('/service-worker.js')
def sw():
    return send_from_directory('static', 'service-worker.js')

@app.route('/icon.png')
def icon():
    return send_from_directory('static', 'icon.png')

@app.route('/splash.png')
def splash():
    return send_from_directory('static', 'splash.png')

STREAMLIT_URL = os.getenv("STREAMLIT_URL", "http://127.0.0.1:8501")
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def proxy(path):
    return redirect(STREAMLIT_URL, code=302)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
