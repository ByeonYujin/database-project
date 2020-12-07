const config = require("../config").db;
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
        operatorsAliases: false,
        
        pool: config.pool
    }
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op;

db.user = require("./user.model")(sequelize);

module.exports = db;