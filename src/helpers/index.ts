export const isUnnecessaryCharacter = string => {
  const unnecessaryCharacters = [
    'OBSERVAÇÕES', 'TERRITÓRIO', 'NACIONAL',
    'PROIBIDO', 'PLASTIFICAR', 'ASSINATURA',
    'PORTADOR', 'REGISTRO', 'VALIDADE', 'REPUBLICA',
    'IDENTIDADE/', 'EMISSOR', 'REPUBLICATIDERATIVA',
    'CIDADES', 'NACIONAL', 'NOME', 'PORTADOR',
    'HABILITAÇÃO', 'HABILITACAO', 'CPF', 'NACIONALIDADE', 'MINISTERIO'
  ]
  return unnecessaryCharacters.includes(string)
}

export const regex = {
  cpf: /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2})/,
  dates: /[0-9]{2}\/[0-9]{2}\/(([1,2][9,0][0-9][0-9])|([0-9]{2}))/,
  numbers: /^\d+$/
}

export const imageToBase64 = (pathToImage: string) => {
  const fs = require('fs');
  return fs.readFileSync(pathToImage, 'base64');
}