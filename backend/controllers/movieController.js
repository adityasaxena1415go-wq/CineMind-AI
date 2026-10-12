import axios from "axios";

const API_KEY = process.env.TMDB_API_KEY;

export const getRecommendations = async (req, res) => {
  try {
    const { movie } = req.body;

    if (!movie) {
      return res.status(400).json({
        success: false,
        message: "Movie name is required",
      });
    }

    // Flask AI
    const response = await axios.post(
      "http://127.0.0.1:5001/recommend",
      { movie } 
      
    );

    const recommendations =
      response.data.recommendations || [];

    // TMDB Search
    const finalRecommendations = await Promise.all(
      recommendations.map(async (item) => {
        try {
          const tmdb = await axios.get(
            "https://api.themoviedb.org/3/search/movie",
            {
              params: {
                api_key: API_KEY,
                query: item.title,
              },
            }
          );

          return {
            ...item,
            tmdb:
              tmdb.data.results.length > 0
                ? tmdb.data.results[0]
                : null,
          };
        } catch {
          return {
            ...item,
            tmdb: null,
          };
        }
      })
    );

    res.json({
      success: true,
      recommendations: finalRecommendations,
    });
  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      success: false,
      message: "Unable to get recommendations",
    });
  }
};
