module.exports = (sequelize, DataTypes) => {
  const Scream = sequelize.define('Scream', {
    userHandle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    likeCount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    commentCount: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {});
  Scream.associate = (models) => {
    Scream.hasMany(models.Like, {
      foreignKey: 'screamId',
      onUpdate: 'CASCADE'
    });
    Scream.hasMany(models.Notification, {
      foreignKey: 'screamId',
      onUpdate: 'CASCADE'
    });
    Scream.belongsTo(models.User, {
      foreignKey: 'image',
      onUpdate: 'CASCADE'
    });
    Scream.belongsTo(models.User, {
      foreignKey: 'handle',
      onDelete: 'CASCADE'
    });
  };
  return Scream;
};
