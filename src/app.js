const express = require ('express')

class App {
    constructor (){
        this.app = express()

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.json())

    }

    routes () {}

}

module.exports = new App().app