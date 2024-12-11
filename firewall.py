from flask import Flask, request, jsonify
import requests
import time
import logging
from itertools import cycle

app = Flask(__name__)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# In-memory data structures for dynamic rule management
blocked_ips = ["192.168.1.100"]
blocked_ports = [8080]
rate_limit = {}

# Backend service URLs for load balancing
backend_services = [
    "http://backend1:5001/api",
    "http://backend2:5001/api"
]

# Use cycle from itertools for round-robin selection
backend_cycle = cycle(backend_services)

# Backend service health status (for error handling)
backend_health = {
    "http://backend1:5001/api": True,
    "http://backend2:5001/api": True
}

# Backend service address
max_retries = 3
retry_delay = 2  # seconds

# Helper function for rate limiting
def is_rate_limited(ip):
    current_time = time.time()
    if ip not in rate_limit:
        rate_limit[ip] = []
    # Remove outdated requests (window of 10 seconds)
    rate_limit[ip] = [t for t in rate_limit[ip] if t > current_time - 10]
    if len(rate_limit[ip]) >= 5:  # Limit: 5 requests per 10 seconds
        return True
    rate_limit[ip].append(current_time)
    return False

# Helper function to check if a backend service is healthy
def check_backend_health(url):
    try:
        response = requests.get(url, timeout=5)
        return response.status_code == 200
    except requests.exceptions.RequestException:
        return False

# Function to get the next available backend
def get_next_backend():
    for _ in range(len(backend_services)):
        backend = next(backend_cycle)
        if backend_health[backend]:  # If the backend is healthy
            return backend
    return None  # All backends are down

@app.route('/check', methods=['POST'])
def check_request():
    data = request.json
    ip = data.get("ip")
    port = data.get("port")

    # Rate limiting
    if is_rate_limited(ip):
        return jsonify({"status": "blocked", "reason": "Rate limit exceeded"}), 429

    # Check if IP or port is blocked
    if ip in blocked_ips or port in blocked_ports:
        return jsonify({"status": "blocked", "reason": "IP or port is blocked"}), 403

    # Get the next available backend service
    backend = get_next_backend()
    if backend is None:
        return jsonify({"status": "error", "message": "No available backend services"}), 503

    # Forward the request to the backend service
    try:
        retries = 0
        while retries < max_retries:
            try:
                logger.info(f"Forwarding request to {backend}")
                response = requests.post(backend, json=data, timeout=5)
                return jsonify({"status": "forwarded to " + backend, "response": response.json()}), 200
            except requests.exceptions.RequestException:
                retries += 1
                logger.warning(f"Error connecting to {backend}, retrying ({retries}/{max_retries})...")
                time.sleep(retry_delay)

        # If all retries failed
        return jsonify({"status": "error", "message": f"Failed to connect to {backend} after {max_retries} retries"}), 502

    except requests.exceptions.RequestException as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/rules', methods=['GET', 'POST', 'DELETE'])
def manage_rules():
    if request.method == 'GET':
        return jsonify({"blocked_ips": blocked_ips, "blocked_ports": blocked_ports}), 200
    elif request.method == 'POST':
        rule = request.json
        blocked_ips.extend(rule.get("ips", []))
        blocked_ports.extend(rule.get("ports", []))
        return jsonify({"status": "rules updated"}), 200
    elif request.method == 'DELETE':
        rule = request.json
        for ip in rule.get("ips", []):
            if ip in blocked_ips:
                blocked_ips.remove(ip)
        for port in rule.get("ports", []):
            if port in blocked_ports:
                blocked_ports.remove(port)
        return jsonify({"status": "rules deleted"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
