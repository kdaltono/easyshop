module.exports = {
    HOST: 'easyrest_db',
    USER: 'root',
    PASSWORD: '1234',
    DB: 'easyrest',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}