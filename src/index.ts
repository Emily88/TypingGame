import { fetchData } from './api/fetchData'
import App from './App'
import './style.css'
import { WordInfo } from './types'

document.addEventListener('DOMContentLoaded', () => {
  fetchData()
    .then((data: WordInfo[]) => {
      new App(data)
    })
    .catch((e) => {
      console.error(e)
    })
})
