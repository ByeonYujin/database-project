const { DataTypes } = require("sequelize");

const name = "user";
const schema = {
    // 사용자 고유 UUID
    userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },

    // 이메일과 비밀번호
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    // 프로필 이미지 (Cloudinary CDN)
    profile: {
        type: DataTypes.STRING(),
        allowNull: true
    },

    // 행정구역: 특별시/광역시/도
    province: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    // 행정구역: 시/군/구
    city: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    // 행정구역: 동/읍/면/리
    town: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}
const opts = {
    timestamps: true
}

module.exports = (sequelize) => {
    const user = sequelize.define(name, schema, opts);
    
    return user;
};