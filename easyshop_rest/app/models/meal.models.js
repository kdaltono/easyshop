const sql = require('./db')

const Meal = function(meal) {
    this.mealId = meal.meal_id
    this.mealTitle = meal.meal_title
    this.mealDesc = meal.meal_desc
    this.creationDate = meal.creation_date
    this.updatedDate = meal.updated_date
}

Meal.getMealData = (mealId, result) => {
    const query = "select meal_id, meal_title, meal_desc, creation_date, meal_recipe, updated_date from meal where meal_id = ?"

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
    const query = "select "
	+ "m.meal_title, i.ingredient_title, mi.ingredient_qty, me.measure_abbr "
    + "from meal_ingredients mi inner join meal m on (mi.meal_id = m.meal_id) inner join ingredients i on (mi.ingredient_id = i.ingredient_id) inner join measures me on (mi.measure_id = me.measure_id) "
    + "where m.meal_id = ?"

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
    const query = "select "
    + "meal_id, meal_title, meal_desc, creation_date, updated_date "
    + "from meal"

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

Meal.insertNewMeal = (mealData, jwt_user_id, result) => {
    const query = "insert into meal(meal_title, meal_desc, user_id, meal_recipe) values (?, ?, ?, ?)"

    sql.query(query, [mealData.meal_title, mealData.meal_desc, jwt_user_id, mealData.meal_recipe], (err, res) => {
        if (err) {
            console.log("Error: " + err)
            result(err, null)
            return
        }

        result(null, res)
    })
}

module.exports = Meal