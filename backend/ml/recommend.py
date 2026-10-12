import pickle
from pathlib import Path

# ==========================
# Paths
# ==========================

BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "models"

MOVIES_MODEL = MODEL_DIR / "movies.pkl"
SIMILARITY_MODEL = MODEL_DIR / "similarity.pkl"

# ==========================
# Load Models
# ==========================

with open(MOVIES_MODEL, "rb") as f:
    movies = pickle.load(f)

with open(SIMILARITY_MODEL, "rb") as f:
    similarity = pickle.load(f)


# ==========================
# Recommendation Function
# ==========================
def recommend(movie_name, top_n=10):

    movie_name = movie_name.strip().lower()

    # Exact Match
    matched_movies = movies[
        movies["title"].str.lower() == movie_name
    ]

    # Partial Match
    if matched_movies.empty:
        matched_movies = movies[
            movies["title"].str.lower().str.contains(movie_name, na=False)
        ]

    if matched_movies.empty:
        return {
            "success": False,
            "message": "Movie not found.",
            "recommendations": []
        }

    movie_index = matched_movies.index[0]

    distances = list(enumerate(similarity[movie_index]))

    distances = sorted(
        distances,
        key=lambda x: x[1],
        reverse=True
    )

    recommendations = []

    for movie in distances[1:top_n + 1]:

        movie_data = movies.iloc[movie[0]]

        recommendations.append({
            "movieId": int(movie_data["movieId"]),
            "title": movie_data["title"],
            "genres": movie_data["genres"],
            "score": round(float(movie[1]), 3)
        })

    return {
        "success": True,
        "recommendations": recommendations
    }