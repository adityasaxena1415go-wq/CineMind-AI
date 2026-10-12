import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetails from "../pages/MovieDetails";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute"; 
import Watchlist from "../pages/Watchlist"; 
import Profile from "../pages/Profile";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
           <Route
            path="/movie/:id"
                element={
               <ProtectedRoute>
                <MovieDetails />
                 </ProtectedRoute>
                 }
                   />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        /> 
        <Route
  path="/watchlist"
  element={<Watchlist />}
/>
<Route
    path="/profile"
    element={<Profile />}
/>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;