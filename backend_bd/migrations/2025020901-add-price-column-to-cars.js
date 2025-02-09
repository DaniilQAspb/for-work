module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Указываем схему 'public' при описании таблицы
    const tableDescription = await queryInterface.describeTable({
      tableName: "cars",
      schema: "public", // Указываем схему
    });

    if (!tableDescription.price) {
      await queryInterface.addColumn(
        {
          tableName: "cars",
          schema: "public", // Указываем схему
        },
        "price",
        {
          type: Sequelize.DECIMAL(10, 2), // Тип данных для цены
          allowNull: true, // Разрешение на null значения
        }
      );
      console.log("Столбец 'price' добавлен в таблицу 'cars'.");
    } else {
      console.log("Столбец 'price' уже существует в таблице 'cars'.");
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Если нужно отменить миграцию, удаляем столбец 'price'
    await queryInterface.removeColumn(
      {
        tableName: "cars",
        schema: "public", // Указываем схему
      },
      "price"
    );
    console.log("Столбец 'price' удалён из таблицы 'cars'.");
  },
};
