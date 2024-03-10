const sql = require('./db')

const Measure = function(measure) {
    this.measure_id = measure.measure_id
    this.measure_name = measure.measure_name
    this.measure_abbr = measure.measure_abbr
    this.is_liquid_measure = measure.is_liquid_measure
}

Measure.getMeasures = (result) => {
    const query = "select * from measures"

    sql.query(query, (err, res) => {
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

Measure.getUnitMeasure = (result) => {
    const query = "select measure_id from measures where measure_type_id = 'U'"

    sql.query(query, (err, res) => {
        if (err) {
            console.log("Error: " + err)
            result(err, null)
            return
        }

        if (res.length) {
            console.log("Found unit measure ID: " + JSON.stringify(res))
            result(null, res[0])
            return
        }

        result({kind: 'not_found'}, null)
    })
}

module.exports = Measure