const { DataTypes } = require("sequelize");

const name = "image";
const schema = {
    // 제품 ID
    product: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },

    // 이미지 링크
    image: {
        type: DataTypes.STRING(),
        allowNull: false,
        primaryKey: true
    }
}
const opts = {
    underscored: true,
    timestamps: false
}

module.exports = (sequelize) => {
    const image = sequelize.define(name, schema, opts)
    image.removeAttribute('id')

    return image
};