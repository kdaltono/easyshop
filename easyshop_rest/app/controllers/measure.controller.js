const Measure = require('../models/measure.models')

exports.getMeasures = (req, res) => {
    Measure.getMeasures((err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Could not find Measures`
                })
            } else {
                res.status(500).send({
                    message: `Error retreiving Measurs`
                })
            }
        } else {
            res.send(data)
        }
    })
}

exports.getUnitMeasure = (req, res) => {
    Measure.getUnitMeasure((err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: 'Could not find default Unit measure'
                })
            } else {
                res.status(500).send({
                    message: 'Error retrieving Unit Measure'
                })
            }
        } else {
            res.send(data)
        }
    })
}