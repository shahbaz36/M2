const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')

const userRoutes = require('./Routes/userRoutes'); 

const app = express();

app.use(cors());

//Api setup :Listening to incoming request/traffic
app.use('/api/v1/user', userRoutes);


//=====================SERVER=====================//
dotenv.config({path:'./config.env'})
const port = process.env.PORT; 
app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})
//================================================//