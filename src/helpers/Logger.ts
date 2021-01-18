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

  public log(...args: any[]){
    console.log(`${this.getDate()} ${this.title}`, ...args)
  }

  public info(...args: any[]): void {
    this.log(`${blue('[INFO]')}`, ...args)
  }

  public warn(...args: any[]): void {
    this.log(`${yellow('[WARNING]')}`, ...args)
  }

  public err(...args: any[]): void {
    this.log(`${red('[ERROR]')}`, ...args)
  }

}
