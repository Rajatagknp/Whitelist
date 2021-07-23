const express = require('express');
const fileUpload = require('express-fileupload')
const admin = require('firebase-admin');
const cors = require('cors');
const db = require('./models');
const serviceAccount = require("./worker-details-d9124-firebase-adminsdk-ioib5-e0325c4262.json");
const {Users,Permissions,ServiceProviders} = require('./models');
const uuid = require('uuid')


const app = express()
const port = 3000

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use('/',require('./routers'))
app.use('*',(req,res) => {
  res.status(404).send({ message: "URL Not Found" })
})


db.sequelize.sync().then(() => {
  app.listen(port);
  console.log('Server is Running')
});