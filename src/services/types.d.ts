type OcrReadType = {
  type: 'DOCUMENT_TEXT_DETECTION' | 'TEXT_DETECTION' | 'LABEL_DETECTION'
}
type OcrContentType = {
  content: string
}

type OcrRequest = {
  image: OcrContentType,
  features: OcrReadType[]
}

export type OcrRequestBatch = {
  requests: OcrRequest[]
}

export type DataToCompare = {
  fieldName: string
  value: string
}

export type ComparisonResponse = {
  fieldName: string
  value: string
  match: boolean
  closestMatch: string
  percentageMatch: number
}

export type ParsedImageRecon = { 
  inline: string[],
  separated: string[],
  withSpecialChars: string[]
}