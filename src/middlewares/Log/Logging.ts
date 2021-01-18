import { NextFunction, Request, Response } from 'express'
import Logger from '../../helpers/Logger'

export default class Logging {

  static request(req: Request, res: Response, next: NextFunction){
    const log = new Logger('middleware:loggin')

    const path = req.path
    const ip = req.ip
    const method = req.method
    
    let size: number | string = (parseFloat(req.get("content-length")) / 1024) / 1024
    if (size > 1000) ` ${size / 1024} GB `
    else size = ` ${size.toFixed(2)} MB `
    
    let message = `${ip} ${method} ${path}`
    if (method !== 'GET' && method !== 'DELETE') message += size
    log.info(message)

    return next()
  }

}
