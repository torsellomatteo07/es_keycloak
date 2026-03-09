from flask import Flask, request, jsonify, g
from flask_cors import CORS
from auth import require_auth, require_role, get_roles
from database import Database

app = Flask(__name__)
CORS(app)
db = Database()

@app.route("/voti", methods=["GET"])
@require_auth
def get_voti():
    roles = get_roles(g.user)
    username = g.user.get("preferred_username")
    if "docente" in roles:
        return jsonify(db.get_tutti_voti())
    elif "studente" in roles:
        return jsonify(db.get_voti_studente(username))
    return jsonify({"error": "Ruolo non autorizzato"}), 403

@app.route("/voti", methods=["POST"])
@require_auth
@require_role("docente")
def post_voto():
    data = request.json
    db.aggiungi_voto(data['nome'], data['materia'], data['voto'], data['username_studente'])
    return jsonify({"message": "Voto inserito"}), 201

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
