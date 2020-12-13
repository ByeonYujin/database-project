const { DataTypes } = require("sequelize");

const name = "messages";
const schema = {
    // 메시지 고유 ID
    messageId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
}
const opts = {
    timestamps: true
}

module.exports = (sequelize) => {
    const message = sequelize.define(name, schema, opts)
    return message
};