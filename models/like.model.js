module.exports = (sequelize) => {
    const like = sequelize.define('likes', {}, { timestamps: false });
    
    return like
}