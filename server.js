const app = require("./app.js");
let connectDatabase = require("./database/db.js");
const PORT = process.env.PORT || 4000;

// Uncaught Exception Error
process.on('uncaughtException', (err) => {
    console.log(`Error:${err.message}`);
    process.exit(1);
});

connectDatabase();

const server = app.listen(PORT, () => {
    console.log(`server is runnign at http://localhost:${PORT}`);
});

// Unhandled Promise Rejection
process.on('unhandledRejection',(err) => {
    console.log(`Error:${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});