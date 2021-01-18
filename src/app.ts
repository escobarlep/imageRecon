import express from 'express'
import cors from 'cors'
import RouteImageRecon from './routes/RouteImageRecon'
import Logging from './middlewares/Log/Logging'

class App {
  public app: express.Application
  public routePrv: RouteImageRecon

  constructor() {
    this.app = express()
    this.app.use(express.json({limit: '20mb'}))
    this.app.use(cors())

    this.app.use(Logging.request)

    this.routePrv = new RouteImageRecon()
    this.routePrv.routes(this.app)
  }
}
export default new App().app
