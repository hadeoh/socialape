module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userHandle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    screamId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userImage: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});
  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: 'image',
      onUpdate: 'CASCADE'
    });
    Comment.belongsTo(models.User, {
      foreignKey: 'handle',
      onDelete: 'CASCADE'
    });
    Comment.belongsTo(models.Scream, {
      foreignKey: 'id',
      onDelete: 'CASCADE'
    });
  };
  return Comment;
};
