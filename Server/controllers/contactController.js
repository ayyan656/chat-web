
import Contact from "../models/contactModel.js";
import User from "../models/userModel.js";

// Get the logged-in user's contact list
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ owner: req.user._id })
    // Populate registeredUser details for registered contacts
      .populate(
        "registeredUser",
        "username email profile_picture_url online_status"
      );

    res.status(200).json(contacts);
  } catch (error) {
    console.error("GET CONTACTS ERROR:", error);
    res.status(500).json({ message: "Server error while fetching contacts" });
  }
};

// Add a new contact to the user's list
const addContact = async (req, res) => {
  const { displayName, email } = req.body;
  const ownerId = req.user._id;

  // Validate input
  if (!displayName || !email) {
    return res
      .status(400)
      .json({ message: "Display name and email are required." });
  }

  try {
    // Check for duplicate contact
    const normalizedEmail = email.toLowerCase().trim();
    const existingContact = await Contact.findOne({
      owner: ownerId,
      email: normalizedEmail,
    });
    if (existingContact) {
      return res
        .status(409)
        .json({ message: "This email is already in your contact list." });
    }
// Check if the email belongs to a registered user
    const registeredUser = await User.findOne({ email: normalizedEmail });

    // Create new contact
    const newContactData = {
      owner: ownerId,
      displayName,
      email: normalizedEmail,
      isRegistered: !!registeredUser,
      registeredUser: registeredUser ? registeredUser._id : null,
    };

    // Save the new contact
    let newContact = await Contact.create(newContactData);

    // Populate registeredUser details if applicable
    if (newContact.isRegistered) {
      newContact = await newContact.populate(
        "registeredUser",
        "username email profile_picture_url online_status"
      );
    }

    res.status(201).json(newContact);
  } catch (error) {
    console.error("ADD CONTACT ERROR:", error);
    res.status(500).json({ message: "Server error while adding contact" });
  }
};

export { getContacts, addContact };
