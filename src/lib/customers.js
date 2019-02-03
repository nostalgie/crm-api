const { Customer } = require('../data-access/DAOs')

const getDependentCustomers = async (employeeId) => {
  const dependentCustomers = await Customer.getDependentCustomers(employeeId)

  const mappedCustomers = dependentCustomers.map(customer => ({
    id: customer.id,
    name: customer.name
  }))

  return { customers: mappedCustomers }
}

module.exports = {
  getDependentCustomers
}
