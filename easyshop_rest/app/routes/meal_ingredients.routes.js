module.exports = (app) => {
    const mealIngredients = require('../controllers/meal_ingredients.controller')
    const passport = require('passport')

    app.post('/mi', passport.authenticate('jwt', { session: false }), mealIngredients.insertMealIngredient)
}