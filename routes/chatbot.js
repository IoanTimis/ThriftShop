const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbot');

router.post('/message', chatbotController.handleMessage);

module.exports = router;
