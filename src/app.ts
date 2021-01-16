import express from 'express'
import cors from 'cors'
import Routes from './routes/Routes'

class App {
  public app: express.Application
  public routePrv: Routes

  constructor() {
    this.app = express()
    this.app.use(express.json())
    this.app.use(cors())
    this.routePrv = new Routes()
    this.routePrv.routes(this.app)
    
  }
}
export default new App().app
