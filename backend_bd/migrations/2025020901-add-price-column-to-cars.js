module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Проверка на существование таблицы 'cars'
    const result = await queryInterface.sequelize.query(
      `SELECT to_regclass('public.cars');`
    );

    if (!result[0][0].to_regclass) {
      throw new Error("Таблица 'cars' не существует!");
    }

    // Проверка наличия столбца 'price' с использованием прямого SQL-запроса
    const columnResult = await queryInterface.sequelize.query(
      `SELECT column_name 
           FROM information_schema.columns 
           WHERE table_schema = 'public' 
           AND table_name = 'cars' 
           AND column_name = 'price';`
    );

    if (columnResult[0].length === 0) {
      await queryInterface.addColumn("cars", "price", {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      });
      console.log("Столбец 'price' добавлен в таблицу 'cars'.");
    } else {
      console.log("Столбец 'price' уже существует в таблице 'cars'.");
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("cars", "price");
    console.log("Столбец 'price' удалён из таблицы 'cars'.");
  },
};
