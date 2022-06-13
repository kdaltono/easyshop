module.exports = app => {
    const ingredients = require('../models/ingredient.models')

    app.get('/i/all', ingredients.getIngredients)
}