module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    screamId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userHandle: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Like.associate = (models) => {
    Like.belongsTo(models.User, {
      foreignKey: 'handle',
      onDelete: 'CASCADE'
    });
    Like.belongsTo(models.Scream, {
      foreignKey: 'id',
      onDelete: 'CASCADE'
    });
  };
  return Like;
};
