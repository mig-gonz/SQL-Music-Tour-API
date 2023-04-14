"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("meet_greet", [
      {
        event_id: 1,
        band_id: 2,
        meet_start_time: "2023-06-22 20:00:00",
        meet_end_time: "2023-06-22 23:00:00",
      },
      {
        event_id: 2,
        band_id: 1,
        meet_start_time: "2023-06-22 20:00:00",
        meet_end_time: "2023-06-22 23:00:00",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // note that this deletes ALL data from the bands table
    await queryInterface.bulkDelete("meet_greet", null, {});
  },
};
