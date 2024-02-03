const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("../backend/config/database");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to unhandeled Promise Rejection`);
    process.exit(1);
  });

//config
dotenv.config({path:"backend/config/config.env"});

// connect database

connectDatabase();



app.listen(process.env.PORT,()=>{

    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})


// Unhandled Promised Rejection
process.on("unhandledRejection", (err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promised Rejection `);

    Server.close(()=>{
        process.exit(1);
    });
});