const Product = require("../models/product");
const usersBoughtProducts = require("../models/usersBoughtProducts");
const userCartProducts = require("../models/userCartProducsts");
const { Op } = require('sequelize');

const home = (req, res) => {
    res.render('pages/generalPages/index');
};

const contact = (req, res) => {
    res.render('pages/generalPages/contact');
};

const about = (req, res) => {
    res.render('pages/generalPages/about');
};

const search = async (req, res) => {
    const products = await Product.findAll();

    if (!products) {
        //TODO Nu a fost gasit niciun produs
    }
    res.render('pages/generalPages/search', { products: products });
};

const searchResults = async (req, res) => {
    const { search, maxPrice } = req.query;

    try {
        const products = await Product.searchProducts(search, maxPrice);

        if (products.length === 0) {
            //Todo: add message to the view
            // return res.render('pages/generalPages/search', { products: [], message: 'Nu au fost gasite produse.' });
        }

        res.render('pages/generalPages/search', { products: products });
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).send('Internal Server Error');
    }
};

//cart-----------------------------------------------

const viewCart = async (req, res) => {
    const user_id = req.session.loggedInUser?.id;

    if (!user_id) {
        return res.redirect('/login');
    }

    try {
        const cartItems = await userCartProducts.findAll({ where: { user_id } });
        res.render('pages/generalPages/cart', { cartItems });
    } catch (error) {
        console.error('Eroare la afișarea coșului:', error);
        res.status(500).send('Eroare internă.');
    }
};

const addToCart = async (req, res) => {
    const { productId } = req.params;
    const user_id = req.session.loggedInUser?.id;

    if (!user_id) {
        return res.status(401).send('Trebuie să fii logat pentru a adăuga în coș.');
    }

    try {
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).send('Produsul nu există.');
        }

        await userCartProducts.create({
            name: product.name,
            price: product.price,
            user_id,
        });

        //res.redirect('/cart');
        res.status(200).send('Produsul a fost adăugat în coș.');
        console.log('Produsul a fost adăugat în coș.'); 
    } catch (error) {
        console.error('Eroare la adăugarea în coș:', error);
        res.status(500).send('Eroare internă.');
    }
};

const removeFromCart = async (req, res) => {
    const { itemId } = req.params;
    const user_id = req.session.loggedInUser?.id;

    try {
        await userCartProducts.destroy({ where: { id: itemId, user_id } });
        // res.redirect('/cart');
        res.status(200).send('Produsul a fost șters din coș.');
        console.log('Produsul a fost șters din coș.');
    } catch (error) {
        console.error('Eroare la ștergerea produsului din coș:', error);
        res.status(500).send('Eroare internă.');
    }
};

const checkout = async (req, res) => {
    const user_id = req.session.loggedInUser?.id;

    if (!user_id) return res.redirect('/login');

    try {
        const cartItems = await userCartProducts.findAll({ where: { user_id } });

        for (let item of cartItems) {
            await usersBoughtProducts.create({
                name: item.name,
                price: item.price,
                user_id,
                product_id: item.product_id,
            });
        }

        await userCartProducts.destroy({ where: { user_id } });

        res.render('pages/generalPages/checkoutSuccess');
    } catch (error) {
        console.error('Eroare la checkout:', error);
        res.status(500).send('Eroare internă.');
    }
};

const chatbot = async (req, res) => {
    res.render('pages/test/chatbot');
}

module.exports = {
    home,
    about,
    contact,
    search,
    searchResults,
    viewCart,
    addToCart,
    removeFromCart,
    checkout,
    chatbot
};
