module.exports = (app) => {
    const meallist = require('../controllers/meal_list.controller')
    const passport = require('passport')

    app.get('/ml/a', passport.authenticate('jwt', { session: false }), meallist.getActiveMealLists)
    app.get('/ml/:meal_list_id', passport.authenticate('jwt', { session: false }), meallist.getMealListDataFromId)
    app.get('/ml/m/:meal_list_id', passport.authenticate('jwt', { session: false }), meallist.getMealListMeals)
    app.post('/ml', passport.authenticate('jwt', { session: false }), meallist.insertMealList)
}