const mongoose = require('mongoose');

class Database {
    constructor() {
        this.connectionString = process.env.DB_STRING;
    }

    start() {
        mongoose.connect(this.connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Mongodb Connection Error:'));
    }
}



module.exports = Database;