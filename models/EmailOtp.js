const mongoose  = require('mongoose')
const Schema = mongoose.Schema


const EmailSchema = new Schema({
    emailotp: {
            type: Number,
            require:true
          },  
})
EmailSchema.set('timestamps', true)

module.exports = mongoose.model('EmailOtp', EmailSchema)