import { ImageReconService } from '../services/ImageReconService'
import { imageToBase64 } from '../helpers/index'
import { Request, Response } from 'express'
import { CompareService } from '../services/CompareService'

export class ImageReconController {

  public async read(req: Request, res: Response) {
    try {
      //const { image } = req.body;
      const image = imageToBase64('src/resources/cnh-escobar.jpg')
      const irService = new ImageReconService()
      const result = await irService.read(image)
      const parsedAnnotations = irService.parse(result)

      return res.json(parsedAnnotations)
    } catch (error) {
      console.log(error)
      return res.json({msg: 'error', error: error.message})  
    }
  }

  public async compare(req: Request, res: Response) {
    try {
      const { base64Image, data } = req.body;
      const irService = new ImageReconService()
      const compareService = new CompareService()
      const result = await irService.read(base64Image)
      const parsedAnnotations = irService.parse(result)
  
      return res.json(compareService.compare(parsedAnnotations, data)) 
    } catch (error) {
      return res.json(error)
    }
  }
}