//Imports 
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const userRoutes = require('./Routes/userRoutes'); 

//Firebase
const admin = require('firebase-admin')
const serviceAccount  = require('./service-account.json');

admin.initializeApp({
    credential : admin.credential.cert(serviceAccount)
})

// Express app
const app = express();

//Api setup :Listening to incoming request/traffic
app.use(cors());
app.use(express.json());
app.use('/api/v1/user', userRoutes);


//=====================SERVER=====================//
dotenv.config({path:'./config.env'})
const port = process.env.PORT; 
app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})
//================================================//