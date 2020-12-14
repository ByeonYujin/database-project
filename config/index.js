// 환경변수 초기화
require("dotenv").config()

module.exports = {
    port: process.env.PORT || 3500,
    db: {
        limit: 50,
        host:       process.env.DB_HOST || "management.c96otstrvsjv.us-east-2.rds.amazonaws.com",
        database:   process.env.DB_NAME || "db_project",
        user:       process.env.DB_USER || "user",
        password:   process.env.DB_PASS || "eja959595~",
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
    },
    
    maxImageSize: parseInt(process.env.MAX_IMAGE_SIZE) || 5,
    linkSecret: process.env.LINK_SECRET || "secret",
    postsPerPage: parseInt(process.env.POST_PER_PAGE) || 10
}