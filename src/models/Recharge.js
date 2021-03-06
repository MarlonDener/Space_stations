const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserVolt'
  },
  rechargePlace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PlanetStation'
  },
  initialDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    default: Date.now
  },
  isActiveRecharge: {
    type: Boolean,
    default: true
  },
  reservationId: {
    type: String
  }
})

module.exports = mongoose.model('Recharge', UserSchema)
