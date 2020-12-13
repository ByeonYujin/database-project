const config = require("../config").db;
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
        pool: config.pool,

        logging: false
    }
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op;

db.user = require("./user.model")(sequelize);
db.mean = require("./mean.model")(sequelize);
db.product = require("./product.model")(sequelize);
db.post = require("./post.model")(sequelize);
db.like = require("./like.model")(sequelize);
db.message = require("./message.model")(sequelize);
db.category = require("./category.model")(sequelize);


module.exports = db;