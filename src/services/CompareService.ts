import { DataToCompare, ComparisonResponse } from './types'

export class CompareService {
  public compare(resultsFromImage, dataToCompare: DataToCompare): ComparisonResponse {

    return dataToCompare as ComparisonResponse
  }
}
