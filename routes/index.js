const express = require('express');
const axios = require('axios');
const router = express.Router();

// Function to get data from API
const getData = (url, res, template, errorMessage) => {
    axios.get(url)
        .then(response => {
            const drinks = response.data.drinks;
            if (!drinks || drinks.length === 0) {
                throw new Error('Sorry, no drinks found!!!');
            }
            res.render(template, { cocktail: drinks[0], cocktails: drinks });
        })
        .catch(error => {
            console.error(errorMessage, error);
            res.render('error', { message: errorMessage });
        });
};

// Random cocktail route
router.get('/', (req, res) => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    getData(url, res, 'index', 'Could not get random cocktail :c');
});

// Search for cocktails route
router.get('/search', (req, res) => {
    const query = req.query.query;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;
    getData(url, res, 'search', 'Could not get search results :c');
});

// Cocktail route
router.get('/cocktail/:idDrink', (req, res) => {
    const idDrink = req.params.idDrink;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
    getData(url, res, 'index', 'Could not get cocktail details :c');
});

module.exports = router;
