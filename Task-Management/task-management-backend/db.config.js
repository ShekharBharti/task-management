const dbConfig = {
    user: process.env.MONGO_DB_USER || '',
    pwd: process.env.MONGO_DB_PWD || '',
    url: process.env.MONGO_DB_URL
}

module.exports = Object.freeze(dbConfig);