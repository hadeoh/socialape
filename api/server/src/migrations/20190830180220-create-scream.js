module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Screams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userHandle: {
        type: Sequelize.STRING,
        allowNull: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Users',
          key: 'handle'
        }
      },
      userImage: {
        type: Sequelize.STRING,
        allowNull: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Users',
          key: 'image'
        }
      },
      body: {
        type: Sequelize.STRING,
        allowNull: false
      },
      likeCount: {
        type: Sequelize.STRING,
        allowNull: true
      },
      commentCount: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Screams');
  }
};
