import { ImageReconService } from '../services/ImageReconService'
import { imageToBase64 } from '../helpers/index'
import { Request, Response } from 'express'
import { CompareService } from '../services/CompareService'
import Logger from '../helpers/Logger'
const log = new Logger('controller:ImageReconController')

export class ImageReconController {

  public async read(req: Request, res: Response) {
    try {
      const image = imageToBase64('src/resources/cnh-escobar.jpg')
      const irService = new ImageReconService()
      const result = await irService.read(image)
      const parsedAnnotations = irService.parse(result)

      return res.json(parsedAnnotations)
    } catch (error) {
      log.err('error', error)
      return res.json({msg: 'error', error: error.message})  
    }
  }

  public async compare(req: Request, res: Response) {
    try {
      const { base64Image, data } = req.body;

      const irService = new ImageReconService()
      const result = await irService.read(base64Image)
      const parsedAnnotations = irService.parse(result)

      const compareService = new CompareService(parsedAnnotations)
      const dataCompared = compareService.compare(data)

      return res.json(dataCompared)
    } catch (error) {
      log.err('error', error)

      return res.json(error)
    }
  }
}