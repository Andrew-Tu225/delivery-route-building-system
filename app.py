from flask import Flask, render_template
from dotenv import load_dotenv
import os

app = Flask(__name__)

load_dotenv()

GOOGLE_MAP_API_KEY = os.getenv("GOOGLE_MAP_API_KEY")

@app.route('/')
def index():
    return render_template('index.html', google_map_api=GOOGLE_MAP_API_KEY)