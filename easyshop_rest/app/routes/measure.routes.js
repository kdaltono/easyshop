module.exports = (app) => {
    const measure = require('../controllers/measure.controller')

    app.get('/me', measure.getMeasures)
}