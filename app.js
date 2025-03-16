
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./Routes/index');

const app = express();

const port = 5402;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ Handle URL-encoded data

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api', routes);

// If you want to connect with the local mongoDB
//    - mongodb://127.0.0.1:27017/

// If you want to connect to the MongoDB Atlas
//   mongodb+srv://root:abcdefgh@cluster0.spcvd.gcp.mongodb.net/zomato?retryWrites=true&w=majority
//   - provide username, password and database name

mongoose.connect(
    'mongodb://localhost:27017/local', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(success => {
    console.log("Connected to MongoDB");

    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    });

}).catch(error => {
    console.log("Cannot connect to MongoDB: " + error);
});