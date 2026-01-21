# 🗺️ Capacity-Based Route Planner

An advanced web application for logistics optimization. This tool allows users to define a central depot, add delivery points with specific demand requirements, and visualize optimized routing using the Google Maps API.

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Project Structure](#-project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#-installation--setup)
- [Google Maps API Configuration](#-google-maps-api-configuration)
- [Usage Guide](#-usage-guide)
- [Tech Stack](#-tech-stack)
- [License](#-license)

## 🔍 Overview

This project addresses the Capacitated Vehicle Routing Problem (CVRP) by providing a user-friendly interface to input locations and demands. It's designed for small-to-medium delivery fleets looking to visualize and organize their daily routes.

## 🚀 Key Features

- 📍 **Dynamic Depot Setting**: Search and lock your central hub with a single click.
- 📊 **Demand Management**: Assign specific "Capacity Demand" (e.g., number of passengers or packages) to each stop.
- 🔍 **Smart Search**: Integrated with Google Places Autocomplete for fast and accurate location entry.
- 🎨 **Color-Coded Visualization**: Visual distinction between the Depot (Green) and delivery points.
- 📱 **Fully Responsive**: Designed with Tailwind CSS to work seamlessly on tablets, phones, and desktops.

## 📁 Project Structure
```
delivery-route-building-system/
├── app.py                 # Main Flask backend application
├── requirements.txt       # Python dependency list
├── templates/
│   └── index.html        # Frontend UI (Integrated HTML/CSS/JS)
└── static/
    ├── css/              # Custom stylesheets (if separate)
    └── js/               # Map logic and utility scripts
```

## 🛠️ Installation & Setup

### Prerequisites

- Python 3.8 or higher
- A Google Cloud Platform account with billing enabled (for Maps API)

### Local Setup

1. **Clone the repository:**
```bash
git clone https://github.com/Andrew-Tu225/delivery-route-building-system.git
cd delivery-route-building-system
```

2. **Create a Virtual Environment:**
```bash
# Linux/macOS
python -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

3. **Install Dependencies:**
```bash
pip install -r requirements.txt
```

## 🔑 Google Maps API Configuration

This app requires **Maps JavaScript API** and **Places API**.

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the **Maps JavaScript API** and **Places API**.
3. Create an **API Key** in the Credentials section.
4. Open `templates/index.html` and replace `YOUR_API_KEY` in the script tag at the bottom:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
```

## 💻 Running the App

Run the following command in your terminal:
```bash
python app.py
```

Then visit `http://127.0.0.1:5000` in your web browser.

## 📖 Usage Guide

1. **Initialize**: Wait for the map to load centered on the default location.
2. **Set Hub**: Use the "Set Depot" search bar to find your starting point. Click "Set Depot".
3. **Add Stops**: Enter delivery addresses in the "Add Points" section along with the capacity needed.
4. **Plan**: Click "Generate Routes" to trigger the routing algorithm logic.

## ⚙️ Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML5, JavaScript (ES6+), Tailwind CSS
- **Mapping**: Google Maps JavaScript API, Google Places Library
- **Icons**: Google Maps Standard Marker Set

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.