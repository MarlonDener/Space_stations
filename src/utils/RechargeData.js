const MongoRecharge = require('../models/Recharge')

class RechargeUtils {
  async RechargeData (allHistory) {
    const dataAboutRecharge = []
    let isMinutes = false

    allHistory.forEach((element, index) => {
      const now = allHistory[index].endDate
      const past = allHistory[index].initialDate
      const diff = Math.abs(now.getTime() - past.getTime())
      let hoursOrMinutes = Math.ceil(diff / (1000 * 60 * 60))

      if (hoursOrMinutes === 1) {
        isMinutes = true
        hoursOrMinutes = Math.ceil(diff / (1000 * 60))
      }

      const duration = `${hoursOrMinutes} ${isMinutes ? 'minutes' : 'hours'} recharge`
      const end = allHistory[index].endDate.toLocaleString()
      const initial = allHistory[index].initialDate.toLocaleString()

      dataAboutRecharge.push({
        _id: allHistory[index]._id,
        client: allHistory[index].client,
        started_in: initial,
        finalDate: end,
        duration: duration,
        isActiveRecharge: allHistory[index].isActiveRecharge
      })
    })

    return dataAboutRecharge
  }

  async changeWhenRechargeOver () {
    const currentDate = new Date()
    return await MongoRecharge.updateMany({ endDate: { $lte: currentDate } }, { isActiveRecharge: false })
  }
}

module.exports = new RechargeUtils()
