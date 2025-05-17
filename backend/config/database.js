const mongoose = require('mongoose');
const MONGO_URI = "mongodb+srv://rahulsinghcse79:Rahul%40r1.14l@freemongodb.guz6ovf.mongodb.net/RedCart24X7?retryWrites=true&w=majority&appName=FreeMongodb";

const connectDatabase = () => {
    mongoose.set('strictQuery', true); 
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Mongoose Connected");
        })
        .catch((error) => {
            console.error("Mongoose Connection Error:", error);
        });
}

module.exports = connectDatabase;
