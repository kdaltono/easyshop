module.exports = (app) => {
    const meallist = require('../controllers/meal_list.controller')

    app.get('/ml/a', meallist.getActiveMealLists)
    app.get('/ml/:meal_list_id', meallist.getMealListDataFromId)
    app.get('/ml/m/:meal_list_id', meallist.getMealListMeals)
}