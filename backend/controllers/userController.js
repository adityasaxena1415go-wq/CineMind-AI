import User from "../models/User.js";

// Upload Profile Photo
export const uploadAvatar = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.avatar = req.file.path;

    await user.save();

    res.json({
      success: true,
      message: "Profile photo updated",
      user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};