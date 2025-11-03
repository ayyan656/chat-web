import Message from "../models/messageModel.js";

const getMessages = async (req, res) => {
  try {
    // Fetch messages for the specified chat ID
    const messages = await Message.find({ chat: req.params.chatId }).populate(
      "sender",
      "username profile_picture_url email"
    );

    res.status(200).json(messages);
  } catch (error) {
    console.error("GET MESSAGES ERROR:", error);
    res.status(500).json({ message: "Could not fetch messages" });
  }
};

export { getMessages };
