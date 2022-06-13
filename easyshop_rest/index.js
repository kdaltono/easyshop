const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

const corsOptions = {
    origin: "*",
    exposedHeaders: ['sessionId'],
    optionsSuccessState: 200,
    methods: [ 'GET', 'POST', 'OPTIONS', 'HEAD', 'PATCH', 'PUT', 'DELETE' ],
    headers: [ 'Content-Type' ],
    preflightContinue: false,
    allowedHeaders: ['sessionId', 'Content-Type', 'Authorization']
};

app.use(cors(corsOptions))
app.options('*', cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./app/routes/ingredient.routes')(app)
require('./app/routes/meal.routes')(app)

app.get('/', (req, res) => {
    res.send("Hello from EasyShop REST!")
})

app.listen(port, () => {
    console.log(`EasyShop REST listening on port ${port}`)
})