const { DataTypes } = require("sequelize");
const meanModel = require("./mean.model");
const productModel = require("./product.model");
const userModel = require("./user.model");

const name = "post";
const schema = {
    // 게시물 고유 UUID
    post_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    // 카테고리
    category: {
        type: DataTypes.UUID,
        allowNull: false
    },

    // 글 제목
    title: {
        type: DataTypes.STRING(30),
        allowNull: false
    },

    // 글 내용(설명)
    content: {
        type: DataTypes.STRING,
        allowNull: true
    },
    

    // 판매상품(fk)
    product: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: productModel,
            key: 'product_Id'
          }
    },

    // 작성자(fk)
    writer: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: userModel,
            key: 'user_Id'
          }
    },

    // 거래수단
    mean: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        references: {
            model: meanModel,
            key: 'mean_Id'
          }
    },
}
const opts = {
    underscored: true,
    timestamps: true
}

module.exports = (sequelize) => {
    const post = sequelize.define(name, schema, opts)
    return post
};