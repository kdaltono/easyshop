const MealIngredient = require('../models/meal_ingredients.models')

exports.insertMealIngredient = (req, res) => {
    // update this to support multiple meal ingredient data
    req.body.mealIngredientData.forEach(mealIngredient => {
        var errMsg, resMsg;
        MealIngredient.insertMealIngredient(mealIngredient, (err, data) => {
            if (err) {
                errMsg += `Could not insert Meal Ingredient. Meal ID: ${mealIngredient.meal_id}, Ingredient ID: ${mealIngredient.ingredient_id}`
                
            } else {
                resMsg.push(data)
            }
        }) 

        if (errMsg) {
            res.status(500).send({
                message: errMsg
            })
        } else {
            res.send(resMsg)
        }
    });
}