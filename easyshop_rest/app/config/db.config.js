module.exports = {
    HOST: 'easyshop_db',
    USER: 'root',
    PASSWORD: '1234',
    DB: 'easyshop',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}