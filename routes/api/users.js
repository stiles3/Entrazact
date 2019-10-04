const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const main = require('../../config/mailAuth')
const phonemain = require('../../config/PhoneAuth')

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User");
const MailOtp = require("../../models/EmailOtp")
const PhoneOtp = require('../../models/phoneOtp')


router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          username: req.body.username,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password,
          phone: req.body.phone
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

  router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const username = req.body.username;
    const password = req.body.password;
  // Find user by email
    User.findOne({ username }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ username: "Username not found" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.username
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
                user
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

  router.get("/getall", (req, res) => {
    return User.find().select('-hash')
    .then(users => res.json(users))
    .catch(err =>(err))
  })
router.post('/validate', (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body)

  if(isValid)
  {
    return res.status(400).json(errors)
  }
  User.findOne({email: req.body.email})
      .then(user => {
        if(user)
        {
          return res.status(400).json({email: "Email already exists"})
        } else {
          main(req.body.email)
          phonemain(req.body.phone)
          console.log("successfully sent to ", req.body.email)
          console.log("Successfully sent to ", req.body.phone)
          return res.status(200).json({'Validate': "Success"})
       
        }
      })
})


router.get('/getmailotp', (req, res) => {
 return MailOtp.findOne().sort({$natural: -1}).limit(1).exec()
  .then(otp => res.json(otp))
  .catch(err => (err))
})

router.get('/getphoneotp', (req, res) => {
return PhoneOtp.findOne().sort({$natural: -1}).limit(1).exec()
 .then(otp => res.json(otp))
 .catch(err => (err))
})
  module.exports = router;