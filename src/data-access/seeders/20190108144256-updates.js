module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Updates', [
      {
        id: 1,
        user_type: 'employee',
        message: 'сообщение 1',
        user_id: 2,
        ticket_id: 1,
        created_at: '2018-12-05 10:14:00'
      },
      {
        id: 2,
        user_type: 'customer',
        message: 'сообщение 2',
        user_id: 1,
        ticket_id: 1,
        created_at: '2018-12-05 10:14:00'
      },
      {
        id: 3,
        user_type: 'employee',
        message: 'сообщение 3',
        user_id: 2,
        ticket_id: 1,
        created_at: '2018-12-05 10:14:00'
      },
      {
        id: 4,
        user_type: 'employee',
        message: 'сообщение 1',
        user_id: 2,
        ticket_id: 2,
        created_at: '2018-12-05 10:14:00'
      },
      {
        id: 5,
        user_type: 'customer',
        message: 'сообщение 2',
        user_id: 1,
        ticket_id: 2,
        created_at: '2018-12-05 10:14:00'
      },
      {
        id: 6,
        user_type: 'employee',
        message: 'сообщение 3',
        user_id: 1,
        ticket_id: 2,
        created_at: '2018-12-05 10:14:00'
      },
      {
        id: 7,
        user_type: 'employee',
        message: 'сообщение 1',
        user_id: 2,
        ticket_id: 3,
        created_at: '2018-12-05 10:14:00'
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Updates', null)
  }
}
