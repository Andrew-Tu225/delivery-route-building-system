🗺️ Capacity-Based Route Planner

A professional web application built with Flask and the Google Maps JavaScript API. This tool enables logistics planners and transport coordinators to design optimized routes based on vehicle capacity limits and location-specific demands.

🚀 Features

Real-time Visualization: Interactive map interface for managing logistics hubs and delivery points.

Intelligent Search: Integrated with Google Places Autocomplete for pinpoint accuracy.

Depot Management: Easily define and modify your central distribution point.

Capacity Tracking: Assign specific "Demand" (people or cargo units) to every stop.

Responsive Design: Fluid UI built with Tailwind CSS, optimized for both desktop and mobile field use.

📁 Project Structure

route-planner/
├── app.py              # Flask backend server
├── requirements.txt    # Python dependencies
├── templates/
│   └── index.html      # Main frontend interface
└── static/
    ├── css/            # Custom styles
    └── js/             # Map logic (main.js, util.js)


🛠️ Installation & Setup

1. Environment Configuration

Ensure you have Python 3.8+ installed. Clone this repository and navigate to the project root.

Create and activate a virtual environment:

# Create the environment
python -m venv venv

# Activate (macOS/Linux)
source venv/bin/activate

# Activate (Windows)
# venv\Scripts\activate


Install required packages:

pip install -r requirements.txt


2. Google Maps API Setup

This project requires access to Google Cloud Platform (GCP) services.

Visit the Google Cloud Console.

Enable the following APIs for your project:

Maps JavaScript API

Places API

Generate an API Key under "Credentials".

Important: Open templates/index.html and locate the script tag at the bottom. Replace YOUR_API_KEY with your actual key:

<script src="[https://maps.googleapis.com/...&key=YOUR_API_KEY](https://maps.googleapis.com/...&key=YOUR_API_KEY)"></script>


💻 Running the App

Start the server:

python app.py


Access the UI:
Open your browser and go to: http://127.0.0.1:5000

📖 Usage Guide

Step

Action

Description

1. Set Depot

Search for your hub in the "Set Depot" box. Click the green button to lock it as the start/end point.

2. Add Stops

Search for delivery points. Input the "Capacity Demand" (e.g., number of people) for that specific stop.

3. Optimize

Click "Generate Routes" to process the data and visualize the calculated paths.

⚙️ Tech Stack

Backend: Python / Flask

Frontend: HTML5, JavaScript (ES6+), Tailwind CSS

APIs: Google Maps JS SDK, Google Places API

Icons: FontAwesome / Google Map Icons

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.