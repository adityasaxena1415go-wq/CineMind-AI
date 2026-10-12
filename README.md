# 🎬 CineMind AI

AI-powered movie discovery app. CineMind AI recommends movies based on what you like, with an "AI Pick of the Week", genre browsing, trailers and a personal watchlist.

## Features
- 🤖 AI-based movie recommendations (content-based similarity model)
- ⭐ "AI Pick of the Week" hero section + "New AI Pick" button
- 🎭 Genre strip: Action, Sci-Fi, Drama, Thriller, Romance, Comedy, Horror and more
- 🎞️ Movie rows (Popular Bollywood, Trending, etc.) with ratings and year
- ▶️ Watch trailers and view detailed movie info
- 📝 My List (watchlist) for each user
- 🔐 User registration, login and protected routes

## Tech Stack
| Layer | Tech |
|-------|------|
| Frontend | React (Vite), React Router, Context API |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose) |
| ML | Python, pandas, scikit-learn (`movies.pkl`, `similarity.pkl`) |

## Project Structure
```
CineMind-AI/
├── frontend/   # React app (pages, components, services)
└── backend/    # API + ml/ (data and models)
```

## Run Locally

### 1. Clone
```bash
git clone https://github.com/adityasaxena1415go-wq/CineMind-AI.git
cd CineMind-AI
```

### 2. Backend
```bash
cd backend
npm install
```
Create a `.env` file in `backend/` (see `.env.example`):
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
PORT=5000
```
```bash
npm start
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

## ML Model Note
`similarity.pkl` is ~700 MB, so it is **not included** in this repo (GitHub's 100 MB limit).
Generate it from `backend/ml/data/movies.csv` using the ML script in `backend/ml/`
(TODO: add exact command), or download it here: `TODO: Google Drive link`.

## Screenshots
Add screenshots here: `![Home](screenshots/home.png)`

## Author
**Aditya** — B.Tech, Invertis University
GitHub: [@adityasaxena1415go-wq](https://github.com/adityasaxena1415go-wq)
