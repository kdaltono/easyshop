const sql = require('./db')

const MealIngredient = function(mealIngredient) {
    this.meal_id = mealIngredient.meal_id
    this.ingredient_id = mealIngredient.ingredient_id
    this.ingredient_qty = mealIngredient.ingredient_qty
}

MealIngredient.insertMealIngredient = (mealIngredient, result) => {
    const query = "call insert_meal_ingredient(?, ?, ?, ?)"

    sql.query(query, [mealIngredient.meal_id, mealIngredient.ingredient_id, mealIngredient.ingredient_qty, mealIngredient.measure_id], (err, res) => {
        if (err) {
            console.log("Error: " + err)
            result(err, null)
            return
        }

        console.log("Inserted meal ingredients")
        result(null, res)
        return
    })
}

module.exports = MealIngredient