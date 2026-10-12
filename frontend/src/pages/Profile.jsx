import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { getWatchlist } from "../services/movieService";
import { uploadAvatar } from "../services/authService";
export default function Profile() {
  const [user, setUser] =useState(null);
  const [watchlist, setWatchlist] = useState([]);
const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));

    if (!data) {
      navigate("/login");
      return;
    }

    setUser(data);

    loadWatchlist(data.id || data._id);
  }, []);

  const loadWatchlist = async (id) => {
    try {
      const movies = await getWatchlist(id);
      setWatchlist(movies);
    } catch (err) {
      console.log(err);
    }
  };
const handleAvatar = async (e) => {
  try {
    const file = e.target.files[0];

    if (!file) return;

    setLoading(true);

    const res = await uploadAvatar(user._id || user.id, file);

    const updatedUser = res.user;

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);

    alert("Profile Updated ✅");

  } catch (err) {
    console.log(err);
    alert("Upload Failed");
  } finally {
    setLoading(false);
  }
};
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cinemind_token");

    navigate("/login");
  };

  if (!user) return null;

  return (
    <MainLayout>

      <div className="min-h-screen bg-[#080808] text-white flex justify-center items-center p-10">

        <div className="bg-[#181818] rounded-3xl p-10 w-full max-w-lg shadow-xl">

          <div className="flex flex-col items-center">

            <div className="relative">

  <img
    src={
      user.avatar
        ? user.avatar
        : `https://ui-avatars.com/api/?name=${user.name}`
    }
    className="w-32 h-32 rounded-full object-cover border-4 border-red-500"
  />

  <label className="absolute bottom-0 right-0 bg-red-600 hover:bg-red-500 cursor-pointer rounded-full p-2">

    📷

    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleAvatar}
    />

  </label>

</div>

            <h1 className="text-3xl font-bold mt-6">
              {user.name}
            </h1>
{loading && (
  <p className="text-red-500 mt-2">
    Uploading...
  </p>
)}
            <p className="text-gray-400">
              {user.email}
            </p>

          </div>

          <div className="grid grid-cols-2 gap-5 mt-10">

            <div className="bg-[#242424] rounded-xl p-5 text-center">

              <h2 className="text-4xl font-bold text-red-500">
                {watchlist.length}
              </h2>

              <p className="text-gray-400 mt-2">
                Watchlist
              </p>

            </div>

            <div className="bg-[#242424] rounded-xl p-5 text-center">

              <h2 className="text-4xl font-bold text-yellow-400">
                ⭐
              </h2>

              <p className="text-gray-400 mt-2">
                CineMind User
              </p>

            </div>

          </div>

          <button
            onClick={logout}
            className="w-full mt-10 bg-red-600 hover:bg-red-500 py-3 rounded-xl font-bold"
          >
            Logout
          </button>

        </div>

      </div>

    </MainLayout>
  );
}