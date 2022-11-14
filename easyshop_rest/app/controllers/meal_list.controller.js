const MealList = require('../models/meal_list.models')
const errorResponseHandler = require('../utils/http_err')
const { getUserContentFromPayload } = require('../lib/utils')

exports.getActiveMealLists = (req, res) => {
    const userContent = getUserContentFromPayload(req.header('Authorization'))

    MealList.getActiveMealLists(userContent.user_id, (err, data) => {
        if (err) {
            errorResponseHandler(res, err, undefined, 'Meal List')
        } else {
            res.send(data)
        }
    })
}

exports.getMealListDataFromId = (req, res) => {
    const userContent = getUserContentFromPayload(req.header('Authorization'))
    MealList.getMealListDataFromId(req.params.meal_list_id, userContent.user_id, (err1, data1) => {
        if (err1) {
            errorResponseHandler(res, err1, req.params.meal_list_id, 'Meal List')
        } else {
            MealList.getMealListMeals(req.params.meal_list_id, userContent.user_id, (err2, data2) => {
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
    const userContent = getUserContentFromPayload(req.header('Authorization'))
    MealList.getMealListMeals(req.params.meal_list_id, userContent.user_id, (err, data) => {
        if (err) {
            errorResponseHandler(res, err, req.params.meal_list_id, 'Meal List')
        } else {
            res.send(data)
        }
    })
}

exports.insertMealList = (req, res) => {
    const userContent = getUserContentFromPayload(req.header('Authorization'))
    MealList.insertNewMealList(req.body.meal_list_name, userContent.user_id, (err, data) => {
        if (err) {
            errorResponseHandler(res, err, req.body.meal_list_name, 'Meal List')
        } else {
            res.send(data)
        }
    })
}