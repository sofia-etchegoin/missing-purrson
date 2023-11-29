import request from 'superagent'

const catUrl = '/api/v1/cats'

export function getAllCatsApi(): Promise<string[]> {
  return request.get(catUrl).then((res) => {
    return res.body
  })
}
