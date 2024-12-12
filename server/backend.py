from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Weather API configuration
WEATHER_API_URL = "http://api.openweathermap.org/data/2.5/weather"
WEATHER_API_KEY = "0acd9d03e8c27370ee7c39bdd705eb83"  

@app.route('/api', methods=['POST'])
def handle_request():
    data = request.json
    city = data.get("city")

    if not city:
        return jsonify({"status": "error", "message": "City is required"}), 400

    # Fetch weather data from the weather API
    try:
        response = requests.get(
            WEATHER_API_URL,
            params={"q": city, "appid": WEATHER_API_KEY}
        )
        if response.status_code == 200:
            return jsonify({"status": "success", "weather_data": response.json()}), 200
        else:
            return jsonify({"status": "error", "message": "Failed to fetch weather data"}), 502
    except requests.exceptions.RequestException as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
