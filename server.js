const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// env config
dotenv.config()

// json use
app.use(express.json());
app.use(bodyParser.json());
// urlEncoded
app.use(bodyParser.urlencoded({ extended: true}))
// cors
app.use(cors());

// mongoose connection
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_MONGODBATLAS, ()=>{
    try {
        console.log('Database is connected');
    } catch (error) {
        console.log(error);
    }
})


//routes are here
const authRouter = require('./routes/authRoute.js');
app.use('/', authRouter)
//Static files
app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})
// port
const port = process.env.PORT || 5000;

// listening
app.listen(port, ()=>{console.log(`Express server is running on PORT: ${port}`)})