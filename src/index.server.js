const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');
const app = express();

//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');


env.config();


//mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.zm0jb.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority
//mongodb+srv://Nagush:<password>@cluster0.zm0jb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.zm0jb.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log('Database Connected');
});


app.use(bodyParser());
app.use('/api', authRoutes);
app.use('/api', adminRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on Port : ${process.env.PORT}`);
});