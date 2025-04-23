import express from "express"
import routes from './routes'

class app {

    constructor() {

        this.app = express()

        this.middlewares();
        this.routes();
    }

    middlewares() {

        this.app.use(express.json())
    }

    routes() { 

    this.app.use(routes)
    }

}


 export default new app().app