module.exports = (app) => {
    const ingredients = require('../controllers/ingredient.controller')

    app.get('/i/all', ingredients.getIngredients)
    app.get('/i/:ingredientId', ingredients.getIngredientById)
    app.post('/i/', ingredients.insertIngredient)
}