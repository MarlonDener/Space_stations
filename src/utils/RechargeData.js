const MongoRecharge = require('../models/Recharge')

class RechargeUtils {
  // essa função ficou bem difícil entender, acho que seria uma boa colocar umas variáveis
  // mais descritivas e colocar algumas lógicas em algumas funções menores 
  async rechargeData (allHistory) {
    const dataAboutRecharge = []

    allHistory.forEach((element, index) => {
      let isMinutes = false
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

  // acho que um jeito um pouco mais simples de saber se a recarga está ativa seria tirar
  // esse booleano do banco e deixar sendo um valor calculado quando tu precisar (basicamente uma funçãozinha)
  // que verifica se now() está dentro do tempo da recarga (now > start && now < end)
  // dessa forma tu não precisa se preocupar em atualizar esse valor em todos os lugares e possíveis inconsistências
  // e se tu quiser mostrar isso em alguma query no graphql, tu pode simplesmente executar esse função
  // no resolver da recarga
  async changeWhenRechargeOver () {
    const currentDate = new Date()
    return await MongoRecharge.updateMany({ endDate: { $lte: currentDate } }, { isActiveRecharge: false })
  }
}

module.exports = new RechargeUtils()
