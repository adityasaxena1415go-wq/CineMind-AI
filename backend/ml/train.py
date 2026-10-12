import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pathlib import Path

# -----------------------------
# Paths
# -----------------------------

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
MODEL_DIR = BASE_DIR / "models"

MODEL_DIR.mkdir(exist_ok=True)

MOVIES_PATH = DATA_DIR / "movies.csv"

print("=" * 50)
print("BASE_DIR :", BASE_DIR)
print("DATA_DIR :", DATA_DIR)
print("MOVIES_PATH :", MOVIES_PATH)
print("FILE EXISTS :", MOVIES_PATH.exists())
print("=" * 50)

# -----------------------------
# Load Dataset
# -----------------------------

movies = pd.read_csv(MOVIES_PATH)

movies = movies[["movieId", "title", "genres"]]

movies.fillna("", inplace=True)

movies["features"] = movies["title"] + " " + movies["genres"]

tfidf = TfidfVectorizer(stop_words="english")

feature_matrix = tfidf.fit_transform(movies["features"])

similarity = cosine_similarity(feature_matrix)

with open(MODEL_DIR / "movies.pkl", "wb") as f:
    pickle.dump(movies, f)

with open(MODEL_DIR / "similarity.pkl", "wb") as f:
    pickle.dump(similarity, f)

print("\n====================================")
print(" CineMind AI Model Trained Successfully ")
print("====================================")
print(f"Movies Loaded : {len(movies)}")
print("Model Saved Successfully")