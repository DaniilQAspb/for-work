module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Проверка наличия столбца 'price' с использованием прямого SQL-запроса
    const result = await queryInterface.sequelize.query(
      `SELECT column_name 
         FROM information_schema.columns 
         WHERE table_schema = 'public' 
         AND table_name = 'cars' 
         AND column_name = 'price';`
    );

    if (result[0].length === 0) {
      await queryInterface.addColumn("public.cars", "price", {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      });
      console.log("Столбец 'price' добавлен в таблицу 'cars'.");
    } else {
      console.log("Столбец 'price' уже существует в таблице 'cars'.");
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("public.cars", "price");
    console.log("Столбец 'price' удалён из таблицы 'cars'.");
  },
};
