from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Define blocked IPs and ports
blocked_ips = ["192.168.1.100"]
blocked_ports = [8080]

# Backend service address
backend_service_url = "http://backend:5001/api"

@app.route('/check', methods=['POST'])
def check_request():
    # Extract IP, port, and city from the client request
    data = request.json
    ip = data.get("ip")
    port = data.get("port")
    
    # Check if IP or port is blocked
    if ip in blocked_ips or port in blocked_ports:
        return jsonify({"status": "blocked"}), 403

    # Forward the request to the backend service if allowed
    try:
        response = requests.post(backend_service_url, json=data)
        return jsonify({"status": "forwarded", "response": response.json()}), 200
    except requests.exceptions.RequestException as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
    
    
