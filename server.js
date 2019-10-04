
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require("passport");
const csp = require('content-security-policy');

const users = require("./routes/api/users");

const app = express()
const cors = require('cors')

const cspPolicy = {
  'report-uri': '/reporting',
  'default-src': csp.SRC_SELF,
  'img-src': csp.SRC_SELF,
  'script-src': [ csp.SRC_SELF, csp.SRC_DATA ]
};

const globalCSP = csp.getCSP(csp.STARTER_OPTIONS);
const localCSP = csp.getCSP(cspPolicy);

app.use(globalCSP);
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use(passport.initialize())


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
if(process.env.NODE_ENV  === 'production')
{
  app.use(express.static(path.join(__dirname, 'client', 'build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

