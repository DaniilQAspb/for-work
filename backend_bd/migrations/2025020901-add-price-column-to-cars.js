module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Проверка наличия столбца 'price' в таблице 'cars'
    const tableDescription = await queryInterface.describeTable("cars");

    if (!tableDescription.price) {
      await queryInterface.addColumn("cars", "price", {
        type: Sequelize.DECIMAL(10, 2), // Тип данных для цены
        allowNull: true, // Разрешение на null значения
      });
      console.log("Столбец 'price' добавлен в таблицу 'cars'.");
    } else {
      console.log("Столбец 'price' уже существует в таблице 'cars'.");
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Если нужно отменить миграцию, удаляем столбец 'price'
    await queryInterface.removeColumn("cars", "price");
    console.log("Столбец 'price' удалён из таблицы 'cars'.");
  },
};
