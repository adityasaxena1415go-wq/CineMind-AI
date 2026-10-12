import Watchlist from "../models/Watchlist.js";

// Add Movie
export const addToWatchlist = async (req, res) => {
  try {
    const { user, movieId, title, poster, rating, releaseDate } = req.body;

    const exists = await Watchlist.findOne({
      user,
      movieId,
    });

    if (exists) {
      return res.json({
        success: false,
        message: "Movie already exists in watchlist",
      });
    }

    const movie = await Watchlist.create({
      user,
      movieId,
      title,
      poster,
      rating,
      releaseDate,
    });

    res.status(201).json({
      success: true,
      movie,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// Get Watchlist
export const getWatchlist = async (req, res) => {

  try {

    const { user } = req.params;

    const movies = await Watchlist.find({ user });

    res.json({
      success: true,
      movies,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// Remove Movie
export const removeFromWatchlist = async (req, res) => {

  try {

    const { id } = req.params;

    await Watchlist.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Movie Removed",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};