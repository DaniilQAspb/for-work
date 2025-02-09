module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Проверка наличия таблицы 'cars' в базе данных
    const [results] = await queryInterface.sequelize.query(
      "SELECT to_regclass('public.cars');"
    );

    if (results[0].to_regclass === null) {
      // Таблица не существует, создаем её
      await queryInterface.createTable("cars", {
        car_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        brand: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        model: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        year: {
          type: Sequelize.INTEGER,
        },
        price: {
          type: Sequelize.DECIMAL(12, 2),
          allowNull: false,
        },
        mileage: {
          type: Sequelize.INTEGER,
        },
        fueltype: {
          type: Sequelize.STRING(20),
        },
        transmission: {
          type: Sequelize.STRING(20),
        },
        description: {
          type: Sequelize.TEXT,
        },
        sold_by_employee_id: {
          type: Sequelize.INTEGER,
        },
      });
      console.log("Таблица 'cars' была создана.");
    } else {
      console.log("Таблица 'cars' уже существует.");
    }

    // Добавление столбца 'price', если его нет
    const columnCheck = await queryInterface.sequelize.query(
      "SELECT column_name FROM information_schema.columns WHERE table_name = 'cars' AND column_name = 'price';"
    );

    if (columnCheck[0].length === 0) {
      await queryInterface.addColumn("cars", "price", {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
      });
      console.log("Столбец 'price' добавлен в таблицу 'cars'.");
    } else {
      console.log("Столбец 'price' уже существует.");
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("cars", "price");
    console.log("Столбец 'price' удалён из таблицы 'cars'.");
  },
};
