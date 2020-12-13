const config = require("../config").db;
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
        pool: config.pool,

        logging: false
    }
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op;

// 사용자 테이블
db.user = require("./user.model")(sequelize);

// 카테고리 테이블 
db.category = require("./category.model")(sequelize);
    // 카테고리 has one 부모 카테고리 (1:1, self)
    db.category.hasOne(db.category, { foreignKey: { name: "parent", allowNull: true } })

// 이미지 테이블
db.image = require("./image.model")(sequelize);

// 게시글 테이블
db.post = require("./post.model")(sequelize);
    // 작성자 has many 게시글 (1:N)
    db.user.hasMany(db.post, { foreignKey: { name: "writer", allowNull: false } })
    // 게시글 has many 이미지 (1:N)
    db.post.hasMany(db.image, { foreignKey: { name: "post", allowNull: false } })

// 제품 테이블
db.product = require("./product.model")(sequelize);
    // 제품 belongs to 카테고리 (N:1)
    db.product.belongsTo(db.category, { foreignKey: { name: "category", allowNull: false }, as: "cat" })
    // 제품 has one 게시글 (1:1)
    db.product.hasOne(db.post, { foreignKey: "sell" })

// 사용자 likes 게시글 (M:N)
db.like = require("./like.model")(sequelize);
    // 작성자 likes many 게시글 (1:N)
    db.user.belongsToMany(db.post, { through: db.like, foreignKey: "user"})
    // 게시글 beloved by many 사용자 (1:M)
    db.post.belongsToMany(db.user, { through: db.like, foreignKey: "post" })

// 메시지 테이블(M:N)
db.message = require("./message.model")(sequelize);
    // 사용자 sends to many 사용자 as sender (1:N)
    db.user.belongsToMany(db.user, { through: db.message, foreignKey: "senderId", as: "sender" })
    // 사용자 sends to many 사용자 as receiver (1:N)
    db.user.belongsToMany(db.user, { through: db.message, foreignKey: "receiverId", as: "receiver" })
    // 게시글 has many 메시지
    db.post.hasMany(db.message, { foreignKey: "post" })

module.exports = db;