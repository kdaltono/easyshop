const MealListMeal = require('../models/meal_list_meal.models')
const errorResponseHandler = require('../utils/http_err')

// TODO: finish controller
exports.insertNewMealListMeal = (req, res) => {
    MealListMeal.insertNewMealListMeal(req.body.mealListMealData, (err, data) => {
        if (err) {
            errorResponseHandler(res, err, req.body.mealListMealData, 'Meal List Meal')
        } else {
            res.send(data)
        }
    })
}