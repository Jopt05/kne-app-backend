const express = require('express');
const cors = require('cors');
const db = require('../database/connection');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usersRoutePath = '/api/users';
        this.authRoutePath = '/api/auth';
        this.twitchRoutePath = '/api/twitch';

        this.connect();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use( cors() )
        this.app.use( express.json() );
    }

    routes() {
        this.app.use(this.usersRoutePath, require('../routes/users'));
        this.app.use(this.authRoutePath, require('../routes/auth'));
        this.app.use(this.twitchRoutePath, require('../routes/twitch'));
    }

    async connect() {
        try {
            await db.authenticate();
            await db.sync({ force: false });
            console.log('Database connected')
        } catch (error) {
            throw new Error(error);
        }
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port: ', this.port);
        });
    }

}

module.exports = Server;