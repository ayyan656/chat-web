import Profile from "../models/profileModel.js";

// @desc    Get or create/update user profile
// @route   PUT /api/profile
// @access  Private
const upsertProfile = async (req, res) => {
  const { displayName, about, profilePictureUrl } = req.body;

  if (!displayName) {
    return res.status(400).json({ message: "Display name is required" });
  }

  try {
    const profileFields = {
      user: req.user._id, // Get user ID from the 'protect' middleware
      displayName,
      about: about || "",
      profilePictureUrl: profilePictureUrl || "",
    };

    // Find a profile by the user ID and update it, or create it if it doesn't exist.
    const profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $set: profileFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(profile);
  } catch (error) {
    console.error("PROFILE UPDATE ERROR:", error);
    res.status(500).json({ message: "Server error while updating profile" });
  }
};

export { upsertProfile };
