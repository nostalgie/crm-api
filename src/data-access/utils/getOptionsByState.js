const { Op } = require('sequelize')
const ticketStates = require('../../constants/ticketStates')

const getOptionsByState = (state) => {
  let options

  switch (state) {
    case ticketStates.OPEN: {
      options = {
        where: {
          rating: {
            [Op.eq]: null
          },
          isFinished: {
            [Op.eq]: false
          }
        }
      }
      break
    }
    case ticketStates.AWAITING_REVIEW: {
      options = {
        where: {
          rating: {
            [Op.eq]: null
          },
          isFinished: {
            [Op.eq]: true
          }
        }
      }
      break
    }
    case ticketStates.CLOSED: {
      options = {
        where: {
          rating: {
            [Op.ne]: null
          },
          isFinished: {
            [Op.eq]: true
          }
        }
      }
      break
    }
    // eslint-disable-next-line:no-lone-blocks
    case ticketStates.BETWEEN_EMPLOYEES: {
      options = (db, executor, role) => ({
        where: {
          ...getOptionsByState(ticketStates.OPEN).where,
          executorFrom: {
            [Op.eq]: executor
          }
        },
        include: [
          {
            model: db.Employee,
            attributes: [],
            required: true,
            include: [
              {
                model: db.EmployeeRole,
                attributes: [],
                where: {
                  name: {
                    [Op.eq]: role
                  }
                }
              }
            ]
          }
        ]
      })
      break
    }
  }

  return options
}

module.exports = getOptionsByState
