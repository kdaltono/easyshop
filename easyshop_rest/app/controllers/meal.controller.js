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