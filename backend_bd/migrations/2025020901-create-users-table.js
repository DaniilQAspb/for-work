module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role_name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "seller", // Дефолтное значение для роли
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true, // Сделано allowNull: true, чтобы не было ошибки
        defaultValue: Sequelize.NOW, // Дефолтное значение
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW, // Дефолтное значение
      },
    });
    console.log("Таблица 'users' была создана.");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
    console.log("Таблица 'users' была удалена.");
  },
};
