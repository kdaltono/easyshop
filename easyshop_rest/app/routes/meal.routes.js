module.exports = (app) => {
    const meal = require('../controllers/meal.controller')

    app.get('/m/all', meal.getAllMeals)
    app.get('/m/:mealId', meal.getMealIngredients)
    app.get('/ma/:mealId', meal.getAllMealData)

    app.post('/m', meal.insertNewMeal)
}