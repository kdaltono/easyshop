const MealList = require('../models/meal_list.models')
const errorResponseHandler = require('../utils/http_err')

exports.getActiveMealLists = (req, res) => {
    MealList.getActiveMealLists((err, data) => {
        if (err) {
            errorResponseHandler(res, err, undefined, 'Meal List')
        } else {
            res.send(data)
        }
    })
}

exports.getMealListDataFromId = (req, res) => {
    MealList.getMealListDataFromId(req.params.meal_list_id, (err1, data1) => {
        if (err1) {
            errorResponseHandler(res, err1, req.params.meal_list_id, 'Meal List')
        } else {
            MealList.getMealListMeals(req.params.meal_list_id, (err2, data2) => {
                if (err2) {
                    errorResponseHandler(res, err2, req.params.meal_list_id, 'Meal')
                } else {
                    res.send({
                        meal_list_data: data1,
                        meal_list_meals: data2
                    })
                }
            })
        }
    })
}

exports.getMealListMeals = (req, res) => {
    MealList.getMealListMeals(req.params.meal_list_id, (err, data) => {
        if (err) {
            errorResponseHandler(res, err, req.params.meal_list_id, 'Meal List')
        } else {
            res.send(data)
        }
    })
}