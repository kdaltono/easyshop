const sql = require('./db')

const MealList = function(meal_list) {
    this.meal_list_id = meal_list.meal_list_id
    this.meal_id = meal_list.meal_id
}

MealList.getActiveMealLists = (result) => {
    const query = "select ml.meal_list_id, ml.meal_list_name, ml.creation_dstamp, ml.is_active, count(mll.meal_id) as meal_list_size from meal_list ml left join meal_list_meal mll on (ml.meal_list_id = mll.meal_list_id) where is_active = TRUE group by ml.meal_list_id, ml.meal_list_name, ml.creation_dstamp, ml.is_active order by ml.creation_dstamp desc"

    sql.query(query, (err, res) => {
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

MealList.getMealListDataFromId = (meal_list_id, result) => {
    const query = "select ml.meal_list_id, ml.meal_list_name, ml.creation_dstamp, ml.is_active, count(mll.meal_id) as meal_list_size from meal_list ml left join meal_list_meal mll on (ml.meal_list_id = mll.meal_list_id) where ml.meal_list_id = ? group by ml.meal_list_id, ml.meal_list_name, ml.creation_dstamp, ml.is_active"

    sql.query(query, meal_list_id, (err, res) => {
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

MealList.getMealListMeals = (meal_list_id, result) => {
    const query = "select m.meal_id, m.meal_title, m.meal_desc from meal m inner join meal_list_meal mll on (mll.meal_id = m.meal_id) where mll.meal_list_id = ?"

    sql.query(query, meal_list_id, (err, res) => {
        if (err) {
            console.log("Error: " + err)
            result(err, null)
            return
        }

        result(null, res)
    })
}

MealList.insertNewMealList = (meal_list_name, result) => {
    const query = "insert into meal_list (meal_list_name) values (?)"

    sql.query(query, meal_list_name, (err, res) => {
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