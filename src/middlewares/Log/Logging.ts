import { NextFunction, Request, Response } from 'express'
import Logger from '../../helpers/Logger'

export default class Logging {

  static request(req: Request, res: Response, next: NextFunction){
    const log = new Logger('middleware:loggin')

    const path = req.path
    const ip = req.ip
    const method = req.method
    const message = `${ip} ${method} ${path}`
    log.info(message)

    return next()
  }

}
