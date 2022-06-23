module.exports = (app) => {
    const ingredientCategories = require('../controllers/ingredient_category.controller')

    app.get('/ic/all', ingredientCategories.getAllCategories)
}