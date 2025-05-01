const express = require('express'); 

const router  = express.Router(); 

const generalController = require('../controllers/general');

//TODO: add middleware to all routes to check if user is logged in (expect about, contact, home)

router.get('/', generalController.home); 
router.get('/about', generalController.about);
router.get('/contact', generalController.contact);

router.get('/search', generalController.search);
router.get('/search-results', generalController.searchResults);

router.get('/cart', generalController.viewCart);
router.get('/cart/add/:id', generalController.addToCart);
router.get('/cart/remove/:id', generalController.removeFromCart);
router.get('/checkout', generalController.checkout);
router.get('/checkout/success', generalController.checkout);

router.get('/chatbot', generalController.chatbot);
module.exports = router; 