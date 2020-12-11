const { DataTypes } = require("sequelize");
const postModel = require("./post.model");
const userModel = require("./user.model");

const name = "like";
const schema = {
    // 사용자 id
    user_Id: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: userModel,
            key: 'user_Id'
          }
    },

    // 게시물
    post_Id: {
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
    const like = sequelize.define(name, schema, opts)
    return like
};