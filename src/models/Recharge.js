const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  isBusy: {
    type: Boolean,
    default: false
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserVolt'
  },
  rechargePlace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'stations'
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
  }
})

module.exports = mongoose.model('Recharge', UserSchema)
