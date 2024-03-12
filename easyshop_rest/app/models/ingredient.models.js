const sql = require('./db')

const Ingredient = function(ingredient) {
    this.ingredientId = ingredient.ingredient_id
    this.ingredientTitle = ingredient.ingredient_title
    this.ingredientDesc = ingredient.ingredient_desc
    this.creationDate = ingredient.creation_date
    this.updatedDate = ingredient.updated_date
}

Ingredient.getIngredients = (result) => {
    const query = "call get_all_ingredients()"
    
    sql.query(query, (err, res) => {
        if (err) {
            console.log("Error: " + err)
            result(err, null)
            return;
        }

        if (res.length) {
            console.log("Found ingredients: " + res)
            result(null, res)
            return;
        }

        result({kind: 'not_found'}, null)
    })
}

Ingredient.getIngredientById = (ingredientId, result) => {
    const query = "call get_ingredient_by_ingredient_id(?)"

    sql.query(query, ingredientId, (err, res) => {
        if (err) {
            console.log("Error: " + err)
            result(err, null)
            return
        }

        if (res.length) {
            console.log("Found ingredient: " + res)
            result(null, res[0])
            return
        }

        result({kind: "not_found"}, null)
    })
}

Ingredient.insertNewIngredient = (ingredient, jwt_user_id, result) => {
    const query = "call insert_ingredient(?, ?, ?, ?, ?)"

    sql.query(query, [ingredient.ingredient_title, ingredient.ingredient_desc, ingredient.ingredient_category_id, jwt_user_id, ingredient.measure_type_id], (err, res) => {
        if (err) {
            console.log("Error: " + err)
            result(err, null)
            return
        }

        console.log("Inserted ingredient")
        result(null, res)
        return
    })
}

module.exports = Ingredient