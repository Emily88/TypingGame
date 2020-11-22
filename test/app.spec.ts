import { beforeEach, describe, expect } from '@jest/globals'
import App from '../src/App'
const fs = require('fs')
const path = require('path')

describe('App test', () => {
  beforeEach(() => {
    const html = fs.readFileSync(
      path.resolve(__dirname, '../src/index.html'),
      'utf8'
    )
    // seems it doesn't work..
    document.documentElement.innerHTML = html
  })
  test('App test', (done) => {
    setTimeout(() => {
      const app = new App([{ second: 10, text: 'sunny Kyung' }])
      expect(app.data).toEqual([{ second: 10, text: 'sunny Kyung' }])
      done()
    }, 1000)
  })
})
