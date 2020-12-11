const { DataTypes } = require("sequelize");
const postModel = require("./post.model");
const userModel = require("./user.model");

const name = "message";
const schema = {
    // 고유 id
    message_Id: {
        type: DataTypes.UUID,
        primaryKey: true
    },

    // 발신인
    sender: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: userModel,
            key: 'user_Id'
          }
    },

    // 수신인
    receiver: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: userModel,
            key: 'user_Id'
          }
    },
    
    // 판매상품(fk)
    post: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: postModel,
            key: 'post_Id'
          }
    }
}
const opts = {
    underscored: true,
    timestamps: true
}

module.exports = (sequelize) => {
    const message = sequelize.define(name, schema, opts)
    return message
};