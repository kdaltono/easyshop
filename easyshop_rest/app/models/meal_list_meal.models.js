const sql = require('./db')


const MealListMeal = function (mealListMeal) {
    this.meal_list_id = mealListMeal.meal_list_id
    this.meal_id = mealListMeal.meal_id
}

MealListMeal.insertNewMealListMeal = (mealListMealData, result) => {
    var query = 'call insert_into_meal_list_meal(?, ?)'

    sql.query(query, [mealListMealData.meal_list_id, mealListMealData.meal_id], (err, res) => {
        if (err) {
            console.log("Error: " + err)
            result(err, null)
            return
        }

        result(null, res)
    })
}

module.exports = MealListMeal