const sql = require('./db')

const Meal = function(meal) {
    this.mealId = meal.meal_id
    this.mealTitle = meal.meal_title
    this.mealDesc = meal.meal_desc
    this.creationDate = meal.creation_date
    this.updatedDate = meal.updated_date
}

Meal.getMealData = (mealId, result) => {
    const query = "call get_meal_by_meal_id(?)"

    sql.query(query, mealId, (err, res) => {
        if (err) {
            console.log("Error: " + err)
            result(err, null)
            return
        }

        if (res.length) {
            console.log('Found meal data: ' + res)
            result(null, res)
            return
        }

        result({kind: 'not_found'}, null)
    })
}

Meal.getMealIngredients = (mealId, result) => {
    const query = "call get_meal_ingredients(?)"

    sql.query(query, mealId, (err, res) => {
        if (err) {
            console.log("Error: " + err)
            result(err, null)
            return
        }

        if (res.length) {
            console.log('Found Meal Ingredients: ' + res)
            result(null, res)
            return
        }

        result({kind: "not_found"}, null)
    })
}

Meal.getAllMeals = (result) => {
    const query = "call get_all_meals()"

    sql.query(query, (err, res) => {
        if (err) {
            console.log("Error: " + err)
            result(err, null)
            return
        }

        if (res.length) {
            console.log("Found Meals: " + res)
            result(null, res)
            return
        }

        result({kind: "not_found"}, null)
    })
}

Meal.getAllMealsByUserId = (userId, result) => {
    const query = "call get_meals_by_user_id(?)"

    // TODO -> Finish this
    sql.query(query, userId, (err, res) => {
        if (err) {
            console.log("Error at Meal.getAllMealsByUserId: " + err)
            result(err, null)
            return
        }

        if (res.length) {
            result(null, res)
            return
        }

        result({kind: "not_found"}, null)
    })
}

Meal.insertNewMeal = (mealData, jwt_user_id, result) => {
    const query = "call insert_meal(?, ?, ?, ?)"

    sql.query(query, [mealData.meal_title, mealData.meal_desc, mealData.meal_recipe, jwt_user_id], (err, res) => {
        if (err) {
            console.log("Error: " + err)
            result(err, null)
            return
        }

        result(null, res)
    })
}

module.exports = Meal