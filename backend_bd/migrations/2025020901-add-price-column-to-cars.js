module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Проверка наличия таблицы 'users' в базе данных
    const [results] = await queryInterface.sequelize.query(
      "SELECT to_regclass('public.users');"
    );

    if (results[0].to_regclass === null) {
      // Таблица не существует, создаем её
      await queryInterface.createTable("users", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
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
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      });
      console.log("Таблица 'users' была создана.");
    } else {
      console.log(
        "Таблица 'users' уже существует. Миграция не будет выполнена."
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Удаляем таблицу 'users', если она существует
    const [results] = await queryInterface.sequelize.query(
      "SELECT to_regclass('public.users');"
    );

    if (results[0].to_regclass !== null) {
      await queryInterface.dropTable("users");
      console.log("Таблица 'users' была удалена.");
    } else {
      console.log(
        "Таблица 'users' не существует. Миграция не будет выполнена."
      );
    }
  },
};
