module.exports = (app) => {
    const mealListMeal = require('../controllers/meal_list_meal.controller')

    app.post('/mlm/i', mealListMeal.insertNewMealListMeal)
}