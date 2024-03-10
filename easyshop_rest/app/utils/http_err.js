module.exports = errorResponseHandler = (res, err, input, model) => {
    if (err.kind === "not_found") {
        if (input) {
            res.status(404).send({
                err: `404: Could not find ${model} with data: ${input}`
            })
        } else {
            res.status(204).send({
                err: `404: Could not find data for ${model}`
            })
        }
    } else {
        if (input) {
            res.status(500).send({
                err: `500: Error retrieving ${model} with data: ${input}`
            })
        } else {
            res.status(500).send({
                err: `500: Error retrieving data for ${model}`
            })
        }
    }
}