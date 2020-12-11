const { DataTypes } = require("sequelize");

const name = "product";
const schema = {
    // 상품 id
    product_Id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },

    // 상품명
    product_Name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },

    // 가격
    price: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    // 거래상태
    soldOut: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false
    }
}
const opts = {
    underscored: true
}

module.exports = (sequelize) => {
    const product = sequelize.define(name, schema, opts)
    return product
};