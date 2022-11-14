module.exports = (app) => {
    const mealListMeal = require('../controllers/meal_list_meal.controller')
    const passport = require('passport')

    app.post('/mlm/i', passport.authenticate('jwt', { session: false }), mealListMeal.insertNewMealListMeal)
}