module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tickets', [
      {
        id: 1,
        type: 'common',
        customer_first_name: 'Василий',
        customer_last_name: 'Олегович',
        customer_number: '11111111',
        description: 'Ошибка 228',
        is_finished: false,
        customer_id: 1,
        executor_from: null,
        executor_to: 2,
        created_at: '2019-01-28 10:14:00',
        updated_at: '2019-01-28 10:14:00'
      },
      {
        id: 2,
        type: 'common',
        customer_first_name: 'Олег',
        customer_last_name: 'Васильевич',
        customer_number: '11111112',
        description: 'Ошибка 322',
        is_finished: true,
        customer_id: 1,
        executor_from: null,
        executor_to: 2,
        created_at: '2018-01-28 10:14:00',
        updated_at: '2018-01-28 10:14:00'
      },
      {
        id: 3,
        type: 'urgent',
        customer_first_name: 'Андрей',
        customer_last_name: 'Петрович',
        customer_number: '11111113',
        description: 'Ошибка 01',
        is_finished: true,
        rating: 3,
        customer_id: 1,
        executor_from: null,
        executor_to: 2,
        created_at: '2019-02-08 10:14:00',
        updated_at: '2019-02-08 10:14:00'
      },
      {
        id: 4,
        type: 'common',
        customer_first_name: 'Андрей',
        customer_last_name: 'Петрович',
        customer_number: '11111113',
        description: 'Ошибка 1213',
        is_finished: false,
        customer_id: 1,
        executor_from: null,
        executor_to: 2,
        created_at: '2018-03-12 10:14:00',
        updated_at: '2018-03-12 10:14:00'
      },
      {
        id: 5,
        type: 'common',
        customer_first_name: 'Андрей',
        customer_last_name: 'Петрович',
        customer_number: '11111113',
        description: 'Ошибка 12345',
        is_finished: false,
        customer_id: 1,
        executor_from: null,
        executor_to: 2,
        created_at: '2019-02-02 10:14:00',
        updated_at: '2019-01-02 10:14:00'
      },
      {
        id: 6,
        type: 'urgent',
        customer_first_name: 'Андрей',
        customer_last_name: 'Петрович',
        customer_number: '11111113',
        description: 'Ошибка 12121212',
        is_finished: true,
        customer_id: 1,
        executor_from: null,
        executor_to: 2,
        created_at: '2019-01-28 10:14:00',
        updated_at: '2019-01-28 10:14:00'
      },
      {
        id: 7,
        type: 'common',
        customer_first_name: 'Андрей',
        customer_last_name: 'Петрович',
        customer_number: '11111113',
        description: 'Ошибка 2xz',
        is_finished: true,
        rating: 5,
        customer_id: 1,
        executor_from: null,
        executor_to: 2,
        created_at: '2018-12-31 10:14:00',
        updated_at: '2019-12-31 10:14:00'
      },
      {
        id: 8,
        type: 'urgent',
        customer_first_name: 'Андрей',
        customer_last_name: 'Петрович',
        customer_number: '11111113',
        description: 'Ошибка qwer',
        is_finished: false,
        customer_id: 1,
        executor_from: null,
        executor_to: 2,
        created_at: '2018-11-11 10:14:00',
        updated_at: '2019-11-11 10:14:00'
      },
      {
        id: 9,
        type: 'common',
        customer_first_name: 'Андрей',
        customer_last_name: 'Петрович',
        customer_number: '11111113',
        description: 'Ошибка ??',
        is_finished: true,
        rating: 1,
        customer_id: 1,
        executor_from: null,
        executor_to: 2,
        created_at: '2019-01-15 10:14:00',
        updated_at: '2019-01-15 10:14:00'
      },
      {
        id: 10,
        type: 'common',
        customer_first_name: 'Андрей',
        customer_last_name: 'Петрович',
        customer_number: '11111113',
        description: 'Ошибка !!',
        is_finished: true,
        rating: 4,
        customer_id: 1,
        executor_from: null,
        executor_to: 2,
        created_at: '2019-01-16 10:14:00',
        updated_at: '2019-01-16 10:14:00'
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tickets', null)
  }
}
