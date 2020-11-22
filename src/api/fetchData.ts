import { WordInfo } from '../types'

export const fetchData = (): Promise<WordInfo[]> => {
  return fetch(
    'https://my-json-server.typicode.com/kakaopay-fe/resources/words'
  ).then((response) => {
    if (200 <= response.status && response.status < 300) {
      return Promise.resolve(response.json())
    } else {
      throw new Error('cannot fetch data: response status is not in 200s')
    }
  })
}
