
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require("passport");

const users = require("./routes/api/users");

const app = express()
const cors = require('cors')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use(passport.initialize())
app.use(express.static('public'))

require('./config/passport')(passport)

app.use('/api/users', users)


const db = require("./config/keys").mongoURI;
mongoose.connect(
    db,
    { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
const port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

