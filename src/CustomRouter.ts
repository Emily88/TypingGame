interface Route {
  rule: string | RegExp
  cb: () => void
  options?: object
}
class CustomRouter {
  private routes: Route[]
  private readonly root: string

  constructor() {
    this.routes = []
    this.root = '/'

    return this
  }

  add(rule: string | RegExp, cb: () => void, options?: object) {
    this.routes.push({
      rule: rule,
      cb: cb,
      options: options
    })
  }

  navigateTo(path: string, state?: object) {
    window.history.pushState(state, '', this.root + path)
    const targetRoute = this.routes.find((route) => {
      return path === route.rule
    })
    if (targetRoute) {
      targetRoute.cb()
    }
  }
}

export default CustomRouter
