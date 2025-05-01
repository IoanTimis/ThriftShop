const { getBotReply } = require('../services/chatbot');

exports.handleMessage = async (req, res) => {
  const { message } = req.body;
  const reply = await getBotReply(message);
  res.json({ reply });
};

