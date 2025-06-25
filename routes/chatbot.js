const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbot');

router.get('/', chatbotController.chatbotPage);
router.post('/message', chatbotController.handleMessage);

module.exports = router;
