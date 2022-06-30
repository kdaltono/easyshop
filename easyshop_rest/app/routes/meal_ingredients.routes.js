module.exports = (app) => {
    const mealIngredients = require('../controllers/meal_ingredients.controller')

    app.post('/mi', mealIngredients.insertMealIngredient)
}