import Profile from "../models/profileModel.js";

const upsertProfile = async (req, res) => {
  const { displayName, about, profilePictureUrl } = req.body;

  // Validate input
  if (!displayName) {
    return res.status(400).json({ message: "Display name is required" });
  }

  try {
    // Prepare profile fields
    const profileFields = {
      user: req.user._id, 
      displayName,
      about: about || "",
      profilePictureUrl: profilePictureUrl || "",
    };
    // Upsert profile document 
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
