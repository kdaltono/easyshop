const Ingredient = require('../models/ingredient.models')

exports.getIngredients = (req, res) => {
    Ingredient.getIngredients((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occured while recieving all ingredients"
            })
        } else {
            res.send(data)
        }
    })
}

exports.getIngredientById = (req, res) => {
    Ingredient.getIngredientById(req.params.ingredientId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    err: `Could not find ingredient with ID: ${req.params.ingredientId}`
                })
            } else {
                res.status(500).send({
                    err: `Error retrieving ingredient with ID: ${req.params.ingredientId}`
                })
            }
        } else {
            res.send(data)
        }
    })
}