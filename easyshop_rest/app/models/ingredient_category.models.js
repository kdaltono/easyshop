const sql = require('./db')

const IngredientCategory = function(ingredientCategory) {
    this.ingredientCategoryId = ingredientCategory.ingredient_category_id
    this.ingredientCategoryName = ingredientCategory.ingredient_category_name
}

IngredientCategory.getAllCategories = (result) => {
    const query = "call get_ingredient_categories()"

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

module.exports = IngredientCategory