import { blue, red, yellow} from 'colors'

export default class Logger {
  
  constructor(
    private title?: string
  ) {
    if (!title) title = 'default:Log'
  }

  private getDate(): string {
    const date = new Date()
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
  }
    return date.toLocaleDateString('pt-br', options)
  }

  public log(message: string){
    console.log(`${this.getDate()} ${this.title} ${message}`)
  }

  public info(message: string): void {
    this.log(`${blue('[INFO]')} ${message}`)
  }

  public warn(message: string): void {
    this.log(`${yellow('[INFO]')} ${message}`)
  }

  public err(message: string): void {
    this.log(`${red('[INFO]')} ${message}`)
  }

}
