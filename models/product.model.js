const { DataTypes } = require("sequelize");

const name = "product";
const schema = {
    // 가격
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    // 직거래 여부
    direct: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    // 택배 배송 여부
    indirect: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            mustDeliver(value) {
                if (!value && !this.direct) {
                    throw new Error("Customers must choose the delivery option.")
                }
            }
        }
    },
    
    // 거래 완료 여부
    soldout: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}
const opts = {
    timestamps: false
}

module.exports = (sequelize) => {
    const product = sequelize.define(name, schema, opts);

    return product
};