import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    movieId: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    poster: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 0,
    },

    releaseDate: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Watchlist", watchlistSchema);