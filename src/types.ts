export interface WordInfo {
  second: number
  text: string
}

export interface Router {
  add: (rule: string | RegExp, cb: () => void, options?: object) => void
  navigateTo: (path: string, state?: object) => void
}
