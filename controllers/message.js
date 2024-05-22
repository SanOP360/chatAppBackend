// controllers/message.js
const User = require("../models/user");

exports.postMessage = async (req, res) => {
  try {
    console.log(req.body);
    const userInstance = await User.findByPk(req.user.id);
    await userInstance.createMessage({ text: req.body.message });
    res
      .status(201)
      .json({ message: "Message posted successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const userInstance = await User.findByPk(req.user.id);
    const messages = await userInstance.getMessages();
    res.status(200).json({ messages, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
