const sql = require('./db')

const Meal = function(meal) {
    this.mealId = meal.meal_id
    this.mealTitle = meal.meal_title
    this.mealDesc = meal.meal_desc
    this.creationDate = meal.creation_date
    this.updatedDate = meal.updated_date
}

Meal.getMealIngredients = (mealId, result) => {
    const query = "select "
	+ "m.meal_title, i.ingredient_title, mi.ingredient_qty "
    + "from meal_ingredients mi inner join meal m on (mi.meal_id = m.meal_id) inner join ingredients i on (mi.ingredient_id = i.ingredient_id) "
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

module.exports = Meal