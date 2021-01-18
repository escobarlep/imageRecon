import * as helpers from '../helpers/index'

import { OcrRequestBatch, ParsedImageRecon } from "./types"

const vision = require('@google-cloud/vision')

const request: OcrRequestBatch = {
  requests: [{
    image: { content: null },
    features: [{ type: 'TEXT_DETECTION' }]
  }]
}

export class ImageReconService {
  
  constructor(
    private ocrService: any = vision,
    private helper: any = helpers,

  ) {}

  public async read(image: string) {
    request.requests[0].image.content = image
    const client = new this.ocrService.ImageAnnotatorClient()

    return client.batchAnnotateImages(request)
  }

  public parse(imageReconResponse: any): ParsedImageRecon {
    let [ result ] = imageReconResponse
    result = result?.responses[0]?.textAnnotations

    const inlineResult = result[0]?.description.split('\n')
    result.shift()

    const separatedFieds = []
    const separatedFiedsWithSpecialCharacters = []
    result.forEach((field: any) => {
      let word = this.helper.isUnnecessaryCharacter(field.description) ? null : field.description
      if (word) {
        separatedFiedsWithSpecialCharacters.push(word)
        word = word.trim().toLowerCase().replace(/-|\.|\/|\*|\||\,/g, '')
        if (word) separatedFieds.push(word)
      }
    })

    return { 
      inline: inlineResult,
      separated: separatedFieds,
      withSpecialChars: separatedFiedsWithSpecialCharacters
    }
  }
}
