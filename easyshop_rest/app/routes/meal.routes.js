module.exports = (app) => {
    const meal = require('../controllers/meal.controller')

    app.get('/m/:mealId', meal.getMealIngredients)
}