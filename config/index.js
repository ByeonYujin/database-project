// 환경변수 초기화
require("dotenv").config()

module.exports = {
    port: process.env.PORT || 3500,
    db: {
        limit: 50,
        host:       process.env.DB_HOST || "localhost",
        database:   process.env.DB_NAME || "default",
        user:       process.env.DB_USER || "root",
        password:   process.env.DB_PASS || "",
        dialect:    process.env.DIALECT || "mysql",
            
        pool: {
            min: 0,
            max: 5,
            acquire: 30000,
            idle: 10000
        }
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET || "secret",
        expires: process.env.TOKEN_EXPIRED || "30m"
    }
}