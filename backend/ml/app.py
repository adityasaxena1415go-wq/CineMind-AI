from flask import Flask, request, jsonify
from flask_cors import CORS

from recommend import recommend

app = Flask(__name__)

CORS(app)


@app.route("/")
def home():
    return jsonify({
        "success": True,
        "message": "CineMind AI ML Server Running 🚀"
    })


@app.route("/recommend", methods=["POST"])
def get_recommendations():

    try:

        data = request.get_json()

        movie = data.get("movie", "")

        if movie == "":
            return jsonify({
                "success": False,
                "message": "Movie name required."
            }), 400

        result = recommend(movie)

        return jsonify(result)

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5001,
        debug=True
    )