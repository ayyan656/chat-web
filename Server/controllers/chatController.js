import Chat from "../models/chatModel.js";

const accessChat = async (req, res) => {
  const { userId } = req.body; // The ID of the user we want to chat with

  // Validate userId
  if (!userId) {
    return res
      .status(400)
      .json({ message: "UserId param not sent with request" });
  }

  // Find if a chat between these two users already exists
  let existingChat = await Chat.findOne({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  }).populate("users", "-password_hash");

  if (existingChat) {
    res.status(200).json(existingChat);
  } else {
    // If no chat exists, create a new one
    const newChatData = {
      chatName: "sender", // Not used for one-on-one chats
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      // Create the chat
      const createdChat = await Chat.create(newChatData);
      // Populate the users field before sending response
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password_hash"
      );
      res.status(201).json(fullChat);
    } catch (error) {
      console.error("CHAT CREATION ERROR:", error);
      res.status(500).json({ message: "Could not create the chat" });
    }
  }
};

export { accessChat };
