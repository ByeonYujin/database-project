const { DataTypes } = require("sequelize");

const name = "category";
const schema = {
    // 카테고리 ID
    catId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    // 카테고리명
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    }
}
const opts = {
    timestamps: false
}

module.exports = (sequelize) => {
    const category = sequelize.define(name, schema, opts)
    return category
};