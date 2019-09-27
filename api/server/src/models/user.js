module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    handle: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Scream, {
      foreignKey: 'userHandle',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Scream, {
      foreignKey: 'userImage',
      onUpdate: 'CASCADE'
    });
    User.hasMany(models.Comment, {
      foreignKey: 'userImage',
      onUpdate: 'CASCADE'
    });
    User.hasMany(models.Like, {
      foreignKey: 'userHandle',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Notification, {
      foreignKey: 'userHandle',
      onDelete: 'CASCADE'
    });
  };
  return User;
};
