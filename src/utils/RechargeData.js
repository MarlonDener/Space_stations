const MongoRecharge = require('../models/Recharge')

class RechargeUtils {
  async changeWhenRechargeOver () {
    const currentDate = new Date()
    return await MongoRecharge.updateMany(
      { endDate: { $lte: currentDate } },
      { isActiveRecharge: false }
    )
  }

  async formatDate (startDateRecharge, endDateRecharge) {
    let isMinutes = false
    const diff = Math.abs(
      endDateRecharge.getTime() - startDateRecharge.getTime()
    )

    let hoursOrMinutes = Math.ceil(diff / (1000 * 60 * 60))

    if (hoursOrMinutes === 1) {
      isMinutes = true
      hoursOrMinutes = Math.ceil(diff / (1000 * 60))
    }
    const rechargeDuration = `${hoursOrMinutes} ${
        isMinutes ? 'minutes' : 'hours'
      } recharge`

    return rechargeDuration
  }
}

module.exports = new RechargeUtils()
