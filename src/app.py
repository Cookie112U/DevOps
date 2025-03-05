from flask import Flask, jsonify, request
from models import get_maps, insert_map

app = Flask(__name__)

@app.route('/maps', methods=['GET'])
def get_all_maps():
    maps = get_maps()
    return jsonify(maps)

@app.route('/maps', methods=['POST'])
def create_map():
    data = request.get_json()
    width = data['width']
    height = data['height']
    map_data = data['map_data']
    map_id = insert_map(width, height, map_data)
    return jsonify({"map_id": map_id}), 201

if __name__ == "__main__":
    app.run(debug=True)
