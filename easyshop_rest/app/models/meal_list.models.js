const sql = require('./db')

const MealList = function(meal_list) {
    this.meal_list_id = meal_list.meal_list_id
    this.meal_id = meal_list.meal_id
}

MealList.getActiveMealLists = (jwt_user_id, result) => {
    const query = "call get_active_meal_lists_by_user_id(?)"

    sql.query(query, jwt_user_id, (err, res) => {
        if (err) {
            console.log("Error: " + err)
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

MealList.getMealListDataFromId = (meal_list_id, jwt_user_id, result) => {
    const query = "call get_meal_list_data_from_meal_list_id(?, ?)"

    sql.query(query, [meal_list_id, jwt_user_id], (err, res) => {
        if (err) {
            console.log("Error: " + err)
            result(err, null)
            return
        }

        if (res.length) {
            result(null, res[0])
            return
        }

        result({kind: 'not_found'}, null)
    }) 
}

MealList.getMealListMeals = (meal_list_id, jwt_user_id, result) => {
    const query = "call get_meal_list_meals(?, ?)"

    sql.query(query, [meal_list_id, jwt_user_id], (err, res) => {
        if (err) {
            console.log("Error: " + err)
            result(err, null)
            return
        }

        result(null, res)
    })
}

MealList.insertNewMealList = (meal_list_name, jwt_user_id, result) => {
    const query = "call insert_meal_list(?, ?)"

    sql.query(query, [meal_list_name, jwt_user_id], (err, res) => {
        if (err) {
            console.log("Error: " + err)
            result(err, null)
            return
        }

        console.log("Inserted new Meal List");
        result(null, res)
        return
    })
}

module.exports = MealList