const mongoose = require("mongoose");

const connectDatabase = ( )=>{
    mongoose.connect(
        process.env.DB_URI)
        .then((data) => {
            console.log(`connected :${data.connection.host}`);
          });
        
};

module.exports = connectDatabase;
