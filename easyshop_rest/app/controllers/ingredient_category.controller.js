const IngredientCategory = require('../models/ingredient_category.models')

exports.getAllCategories = (req, res) => {
    IngredientCategory.getAllCategories((err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    err: `Could not find any Ingredient Categories`
                })
            } else {
                res.status(500).send({
                    err: `Error retrieving Ingredient Categories`
                })
            }
        } else {
            res.send(data)
        }
    })
}