const dotenv = require('dotenv')
const app = require('./app');
const connectDB = require('./config/database');


//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`)
    console.log('Servidor se detuvo debido a un error de de Uncaught Exception')
    process.exit(1);
});


//Enviroment variables
dotenv.config({path: 'backend/config/config.env'})

//Connecting to MongoDB
connectDB();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})


//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`)
    console.log('Servidor se detuvo debido a un error de Unhandled Promise Rejection')

    server.close( () => {
        process.exit(1);
    });
});