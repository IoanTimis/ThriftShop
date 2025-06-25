const { getBotReply } = require('../services/chatbot');

const chatbotPage = (req, res) => {
  res.render('pages/generalPages/chatBot');
}

const handleMessage = async (req, res) => {
  const { message } = req.body;
  const reply = await getBotReply(message);
  res.json({ reply });
};


module.exports = {
  chatbotPage,
  handleMessage
};
