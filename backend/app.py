from flask import Flask, request, jsonify, g
from flask_cors import CORS
from auth import require_auth, require_role

app = Flask(__name__)
# CORS aperto per evitare blocchi
CORS(app, resources={r"/*": {"origins": "*"}})

# Lista condivisa (Slide 6)
shopping_list = []
counter = 1

@app.route("/items", methods=["GET"])
@require_auth
def get_items():
    return jsonify({"items": shopping_list})

@app.route("/items", methods=["POST"])
@require_auth
@require_role("user_plus")
def add_item():
    global counter
    data = request.get_json()
    item_name = data.get("item", "").strip()
    if not item_name:
        return jsonify({"error": "Item vuoto"}), 400
    nuovo = {"id": counter, "nome": item_name}
    shopping_list.append(nuovo)
    counter += 1
    return jsonify({"message": "Aggiunto", "items": shopping_list}), 201

@app.route("/items/<int:item_id>", methods=["DELETE"])
@require_auth
@require_role("user_plus")
def delete_item(item_id):
    for i, item in enumerate(shopping_list):
        if item["id"] == item_id:
            shopping_list.pop(i)
            return '', 204
    return jsonify({"error": "Non trovato"}), 404

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)