const mongoose = require('mongoose')

const PlanetsSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 2,
    max: 20,
    unique: false,
    required: false
  },
  mass: {
    type: Number,
    max: 100,
    required: false,
    unique: false
  },
  hasStation: {
    type: Boolean,
    default: false
  },
  installedStations: {
    type: Array,
    default: []
  }
},
{ timestamps: true }
)

module.exports = mongoose.model('Stations', PlanetsSchema)
