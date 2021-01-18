import { DataToCompare, ComparisonResponse } from './types'
import stringSimilarity from 'string-similarity'
import Logger from '../helpers/Logger'
const log = new Logger('services:CompareService')

type ClosestMatch = { match: number, text: string }
export class CompareService {

  private keepClosestMatch: ClosestMatch
  private SimilarityService: any

  constructor(
    private resultsFromImage: any,
  ){
    this.SimilarityService = stringSimilarity
    this.resetClosestMatch()
  }

  public compare(dataToCompare: DataToCompare[]): { response: ComparisonResponse[], sumUp: any} {
    if (!dataToCompare) throw new Error('No data to compare')
    
    const comparisonResponse: ComparisonResponse[] = dataToCompare.map((data: DataToCompare): ComparisonResponse => {

      //reset counter for closestMatch
      this.resetClosestMatch()

      let whatWasFound = this.resultsFromImage.inline.find((result: string): boolean => this.findMatch(result, data))
      if (!whatWasFound) whatWasFound = this.resultsFromImage.separated
        .find((result: string): boolean => this.findMatch(result, data))

      if (!whatWasFound) whatWasFound = this.resultsFromImage.withSpecialChars
        .find((result: string): boolean => this.findMatch(result, data))

      return {
        fieldName: data.fieldName,
        value: data.value,
        match: !!whatWasFound,
        closestMatch: this.keepClosestMatch.text,
        percentageMatch: this.keepClosestMatch.match
      }
    })

    const sumUp = this.sumUpData(comparisonResponse)

    return { sumUp, response: comparisonResponse }
  }
  
  private sumUpData(comparisonResponse: ComparisonResponse[]) {
    const notAMatch: string[] = []
    let media = 0
    const divisor = comparisonResponse.length
    comparisonResponse.forEach((comp: ComparisonResponse) => {
      media += comp.percentageMatch
      if(!comp.match) notAMatch.push(comp.fieldName) 
    })
    media = media/divisor
    return { percentageMedia: media, notAMatch }
  }

  private updateClosestMatch(match: number, text: string): void {
    if (match > this.keepClosestMatch.match) {
      this.keepClosestMatch.text = text
      this.keepClosestMatch.match = match
    }
  }

  private resetClosestMatch(){
    this.keepClosestMatch = {
      text: null,
      match: 0
    }
  }

  private findMatch(result: string, data: DataToCompare): boolean {
    const match = this.SimilarityService.compareTwoStrings(result.toUpperCase(), data.value.toUpperCase())
    this.updateClosestMatch(match, result)

    if (match === 1) return true
    return false
  }

}
