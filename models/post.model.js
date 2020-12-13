const { DataTypes } = require("sequelize");

const name = "post";
const schema = {

    // 제품 게시글 고유 UUID
    postId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },

    // 글 제목
    title: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    // 글 내용(설명)
    context: {
        type: DataTypes.TEXT('medium'),
        allowNull: true
    },

    // 게시글 삭제 여부 정보
    deletedAt: {
        type: DataTypes.TIME,
        allowNull: true
    }

}
const opts = {
    timestamps: true
}

module.exports = (sequelize) => {
    const post = sequelize.define(name, schema, opts)
    return post
};