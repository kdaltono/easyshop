const Meal = require('../models/meal.models')

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

exports.getAllMeals = (req, res) => {
    Meal.getAllMeals((err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Could not find Meals`
                })
            } else {
                res.status(500).send({
                    message: `Error retrieving meals`
                })
            }
        } else {
            res.send(data)
        }
    })
}

exports.insertNewMeal = (req, res) => {
    Meal.insertNewMeal(req.body.mealData, (err, data) => {
        if (err) {
            res.status(404).send({
                message: 'Could not insert Meal'
            })
        } else {
            res.send(data)
        }
    })
}