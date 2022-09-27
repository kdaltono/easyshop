const sql = require('./db')

const Ingredient = function(ingredient) {
    this.ingredientId = ingredient.ingredient_id
    this.ingredientTitle = ingredient.ingredient_title
    this.ingredientDesc = ingredient.ingredient_desc
    this.creationDate = ingredient.creation_date
    this.updatedDate = ingredient.updated_date
}

Ingredient.getIngredients = (result) => {
    const query = "select i.ingredient_id, i.ingredient_category_id, i.ingredient_title, i.ingredient_desc, i.is_measured_as_liquid " +
    "from ingredients i"
    
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
    const query = "select "
    + "ingredient_id, ingredient_title, ingredient_desc, creation_date, updated_date "
    + "from ingredients "
    + "where ingredient_id = ?"

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

Ingredient.insertNewIngredient = (ingredient, result) => {
    const query = "insert into ingredients (ingredient_title, ingredient_desc, ingredient_category_id, is_measured_as_liquid) values (?, ?, ?, ?)"

    sql.query(query, [ingredient.ingredient_title, ingredient.ingredient_desc, ingredient.ingredient_category_id, ingredient.is_measured_as_liquid], (err, res) => {
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