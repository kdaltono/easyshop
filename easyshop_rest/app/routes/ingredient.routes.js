module.exports = (app) => {
    const ingredients = require('../controllers/ingredient.controller')
    const passport = require('passport')

    app.get('/i/all', ingredients.getIngredients)
    app.get('/i/:ingredientId', ingredients.getIngredientById)
    app.post('/i/', passport.authenticate('jwt', { session: false }), ingredients.insertIngredient)
}