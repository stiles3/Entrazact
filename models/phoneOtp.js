const mongoose  = require('mongoose')
const Schema = mongoose.Schema


const PhoneSchema = new Schema({
    phoneotp: {
             type: Number,
             require:true
           },
})
PhoneSchema.set('timestamps', true)

module.exports = mongoose.model('PhoneOtp', PhoneSchema)