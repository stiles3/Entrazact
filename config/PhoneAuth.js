const otpGenerator = require('otp-generator')
const PhoneOtp = require('../models/phoneOtp')

const accountSid = 'AC5ffeb64656108ed2793944a5ca86b3ca';
const authToken = 'fbf24a428cca20ede82b19e84d494761';
const client = require('twilio')(accountSid, authToken);

const otp =  otpGenerator.generate(6, {
    upperCase: false,
    specialChars: false,
    digits:true, 
    alphabets: false
})

async function createOtp() {
    if (otp)
    {
       const phoneotp = new PhoneOtp()
       phoneotp.phoneotp = otp
       await phoneotp.save()  
    }                                 
   } 

   console.log('phone_otp',otp)

async function phonemain(phone) {
   createOtp()
   client.messages
  .create({
     body: `${otp} is your one-time password`,
     from: '+15203377462',
     to: `${phone}`
   })
  .then(message => console.log(message.sid));
}
   module.exports = phonemain