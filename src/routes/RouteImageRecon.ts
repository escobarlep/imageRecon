import { Request, Response } from 'express'
import { ImageReconController } from '../controllers/ImageReconController'

export default class RouteImageRecon {
  private controller: ImageReconController
  
  constructor() {
    this.controller = new ImageReconController()
  }
  
  public routes(app): void {
    app.route('/')
      .get((request: Request, response: Response) => {
        response.status(200)
          .send({ message: 'GET request successfully.' })
      })

    app.route('/images/read')
      .get(this.controller.read)
    
    app.route('/images/compare')
      .post(this.controller.compare)

  }
}
