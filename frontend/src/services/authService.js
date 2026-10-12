import axios from "axios";

const API = "http://localhost:5000/api/auth";

// Upload Avatar
export const uploadAvatar = async (id, file) => {
  const formData = new FormData();

  formData.append("avatar", file);

  const res = await axios.put(
    `${API}/avatar/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};