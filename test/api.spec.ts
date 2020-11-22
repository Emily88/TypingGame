import { fetchData } from '../src/api/fetchData'
import { describe, expect } from '@jest/globals'
import 'jest-fetch-mock'

describe('API test', () => {
  test('fetch data', () => {
    return fetchData().then((data) => expect(data.length).toBe(12))
  })
})
