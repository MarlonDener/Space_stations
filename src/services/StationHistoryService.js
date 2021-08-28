const RechargeUtils = require('../utils/RechargeData')

class StationHistoryService {
  async handle (allHistory) {
    const dataAboutRecharge = []

    allHistory.forEach(async (_, index) => {
      const startDateRecharge = allHistory[index].initialDate
      const endDateRecharge = allHistory[index].endDate

      const rechargeDuration = await RechargeUtils.formatDate(startDateRecharge, endDateRecharge)

      const formatStartDate = startDateRecharge.toLocaleString()
      const formatEndDate = endDateRecharge.toLocaleString()

      const rechargeId = allHistory[index]._id
      const clientId = allHistory[index].client
      const getActiveRecharge = allHistory[index].isActiveRecharge

      dataAboutRecharge.push({
        _id: rechargeId,
        client: clientId,
        started_in: formatStartDate,
        finalDate: formatEndDate,
        duration: rechargeDuration,
        isActiveRecharge: getActiveRecharge
      })
    })

    return dataAboutRecharge
  }
}

module.exports = new StationHistoryService()
