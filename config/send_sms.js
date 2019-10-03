const accountSid = 'AC5ffeb64656108ed2793944a5ca86b3ca';
const authToken = 'fbf24a428cca20ede82b19e84d494761';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+15203377462',
     to: '+2348114691788'
   })
  .then(message => console.log(message.sid));