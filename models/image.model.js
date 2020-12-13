const { DataTypes } = require("sequelize");

const name = "images";
const schema = {

    imgId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    url: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true
    }
}
const opts = {
    timestamps: false
}

module.exports = (sequelize) => {
    const images = sequelize.define(name, schema, opts)
    return images
};