const Meal = require('../models/meal.models')
const { getUserContentFromPayload } = require('../lib/utils')

exports.getMealIngredients = (req, res) => {
    Meal.getMealIngredients(req.params.mealId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Could not find Meal Ingredients with ID: ${req.params.mealId}`
                })
            } else {
                res.status(500).send({
                    message: `Error retrieving Meal Ingredients with ID: ${req.params.mealId}`
                })
            }
        } else {
            res.send(data)
        }
    })
}

exports.getAllMealData = (req, res) => {
    const mealId = req.params.mealId

    const errHandler = (err) => {
        if (err.kind === "not_found") {
            res.status(404).send({
                err: `Could not find meal with meal ID: ${mealId}`
            })
        } else {
            res.status(500).send({
                err: `Error retrieving meal with meal ID: ${mealId}`
            })
        }
    }

    Meal.getMealData(mealId, (err1, d1) => {
        if (err1) {
            errHandler(err1)
        } else {
            Meal.getMealIngredients(mealId, (err2, d2) => {
                if (err2) {
                    errHandler(err2)
                } else {
                    res.send({
                        meal_data: d1,
                        meal_ingredients: d2
                    })
                }
            })
        }
    })
}

exports.getMealData = (req, res) => {
    Meal.getMealData(req.params.mealId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    err: `Could not find meal with meal ID: ${req.params.mealId}`
                })
            } else {
                res.status(500).send({
                    err: `Error retrieving meal with meal ID: ${req.params.mealId}`
                })
            }
        } else {
            res.send(data)
        }
    })
}

exports.getAllMeals = (req, res) => {
    Meal.getAllMeals((err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    err: `Could not find Meals`
                })
            } else {
                res.status(500).send({
                    err: `Error retrieving meals`
                })
            }
        } else {
            res.send(data)
        }
    })
}

exports.getAllMealsByUserId = (req, res) => {
    Meal.getAllMealsByUserId(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    err: 'Could not find any Meals from User ID ' + req.params.userId
                })
            } else {
                res.status(500).send({
                    err: 'Error retrieving data. ',
                    msg: err
                })
            }
        } else {
            res.send(data)
        }
    })
}

exports.insertNewMeal = (req, res) => {
    const userContent = getUserContentFromPayload(req.header('Authorization'))

    Meal.insertNewMeal(req.body.mealData, userContent.user_id, (err, data) => {
        if (err) {
            res.status(404).send({
                err: 'Could not insert Meal'
            })
        } else {
            res.send(data)
        }
    })
}