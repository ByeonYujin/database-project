const { DataTypes } = require("sequelize");

const name = "mean";
const schema = {
    // id(pk)
    mean_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: 0,
        autoIncrement: true
    },

    // 직거래
    direct: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1
    },

    // 택배
    shipping: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    },
}
const opts = {
    underscored: true,
}

module.exports = (sequelize) => {
    const mean = sequelize.define(name, schema, opts)
    return mean
};