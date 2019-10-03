const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator')
const MailOtp = require('../models/EmailOtp')

const otp =  otpGenerator.generate(6, {
                                               upperCase: false,
                                               specialChars: false,
                                               digits:true, 
                                               alphabets: false,
                                        })
   async function createOtp() {
    if (otp)
    {
       const mailotp = new MailOtp()
       mailotp.emailotp = otp
       await mailotp.save() 
    }                                 
   } 
   
console.log('email_otp', otp)

async function main(email) {
 createOtp()
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'akinstiles349@gmail.com',
               pass: 'Minipapa'
           }
       });

       const mailOptions = {
        from: 'akinstiles349@gmail.com', // sender address
        to: email, // list of receivers
        subject: `Verification ${otp}`, // Subject line
        html: '<!DOCTYPE html> <html><script> var lengthOfName = otp p = document.createElement("p");   p.innerHTML = "Your name is "+lengthOfName+" characters long.";   document.body.appendChild(p);  </script>    <body>        </body>    </html>'// plain text body
      };

/*     let info = await transporter.sendMail({
        from: '"Entrazact', // sender address
        to: email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: otp, // plain text body
        html: '<b>{otp()}</b>' // html body
    }); */

    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });

   /*  console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou... */
}

//main().catch(console.error);
module.exports = main