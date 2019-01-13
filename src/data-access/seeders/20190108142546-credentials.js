module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Login_Credentials', [
      {
        id: 1,
        username: 'test_duty',
        password_hash: '8928d5012380f80ac91d8f5b85e37f6fb2183321f680172a2081f60a20f63f932f84978b8e974de88f50454abc681ec12ecd0e26c66634adc91f98d7a8da6831',
        password_salt: '6d12e6fe5e1d11d1f478674bd3662aa8626f7779',
        user_type: 'employee'
      },
      {
        id: 2,
        username: 'test_senior',
        password_hash: '8928d5012380f80ac91d8f5b85e37f6fb2183321f680172a2081f60a20f63f932f84978b8e974de88f50454abc681ec12ecd0e26c66634adc91f98d7a8da6831',
        password_salt: '6d12e6fe5e1d11d1f478674bd3662aa8626f7779',
        user_type: 'employee'
      },
      {
        id: 3,
        username: 'test_manager',
        password_hash: '8928d5012380f80ac91d8f5b85e37f6fb2183321f680172a2081f60a20f63f932f84978b8e974de88f50454abc681ec12ecd0e26c66634adc91f98d7a8da6831',
        password_salt: '6d12e6fe5e1d11d1f478674bd3662aa8626f7779',
        user_type: 'employee'
      },
      {
        id: 4,
        username: 'test_customer',
        password_hash: '8928d5012380f80ac91d8f5b85e37f6fb2183321f680172a2081f60a20f63f932f84978b8e974de88f50454abc681ec12ecd0e26c66634adc91f98d7a8da6831',
        password_salt: '6d12e6fe5e1d11d1f478674bd3662aa8626f7779',
        user_type: 'customer'
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Login_Credentials', null)
  }
}
