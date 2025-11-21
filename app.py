from flask import Flask, render_template, request
from dotenv import load_dotenv
import os
from model.location import Location
import googlemaps
from clark_wright_algo import ClarkWrightAlgorithm

app = Flask(__name__)

load_dotenv()

GOOGLE_MAP_API_KEY = os.getenv("GOOGLE_MAP_API_KEY")

gmaps = googlemaps.Client(key=GOOGLE_MAP_API_KEY)

@app.route('/')
def index():
    return render_template('index.html', google_map_api=GOOGLE_MAP_API_KEY)

@app.route('/api/generate-routes', methods=["POST"])
def generate_routes():
    data = request.get_json()
    depot = data['depot']
    points = data['points']
    capacity = data['vehicleCapacity']

    # turn json data into location dataclass
    depot_data = Location(depot["name"], depot["lat"], depot["lng"], 0)
    points_data = []
    for point in points:
        points_data.append(Location(point["name"], point["lat"], point["lng"], int(point["demand"])))


    clark_wright_algo = ClarkWrightAlgorithm(gmaps)

    routes = clark_wright_algo.construct_routes(depot_data, points_data, max_capacity=capacity)
    print(routes)

    return routes