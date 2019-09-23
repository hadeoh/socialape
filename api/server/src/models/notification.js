module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    recipient: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    screamId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Notification.associate = (models) => {
    Notification.belongsTo(models.User, {
      foreignKey: 'handle',
      onDelete: 'CASCADE'
    });
    Notification.belongsTo(models.Scream, {
      foreignKey: 'id',
      onDelete: 'CASCADE'
    });
  };
  return Notification;
};
