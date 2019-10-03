const config = require('../config.json')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../_misc/db')
const main = require('../config/mailAuth')
const createOtp = require('../config/PhoneAuth')

const User = db.User

module.exports = {
                     authenticate,
                     create,
                     update,
                     getById,
                     getAll,
                     delete: _delete ,
                     validate,
                     emailvalidate,
                    // phonevalidate
                 }

async function validate({email,  phone }) {
    if(email) {
        main(email)
    }
     if(phone) {
      createOtp()
    } 
}

async function emailvalidate(otp) {
    if(otp)
       {
        if(await Otp.findOne({emailotp: otp}))
          {
            console.log('verified')
          }   
       }
}

async function authenticate({username, password}) {
    const user = await User.findOne({username})
    if (user && bcrypt.compareSync(password, user.password)) 
    {
       const {hash, ...userWithoutHash} = user.toObject()
       const token = jwt.sign({sub: user.id}, config.secret)
       return {
           ...userWithoutHash,
           token
       }
    }
}

async function getAll() {
    return await User.find().select('-hash')
}

async function getById(id) {
    return await User.findById(id).select('-hash')
}

async function create(userParam) {
   if(await User.findOne({username: userParam.username}))
   {
       throw `Username ${userParam.username} is already taken `
   }

   if(await User.findOne({email: userParam.email}))
   {
       throw `Email ${userParam.email} is already taken `
   }

   const user = new User(userParam)

   if(userParam.password) 
   {
       user.password = bcrypt.hashSync(userParam.password, 10)
   }

   await user.save()
}

async function update(id, userParam) {
    const user = await User.findById(id)

    if(!user) throw 'User not found'
    if(user.username !== userParam.username && await User.findOne({username: userParam.username}))
    {
        throw `Username ${userParam.username} is already taken`
    }

    if(userParam.password) 
    {
        user.password = bcrypt.hashSync(userParam.password, 10)
    }

    Object.assign(user, userParam)
    await user.save()
}

async function _delete(id) {
    await User.findByIdAndRemove(id)
}