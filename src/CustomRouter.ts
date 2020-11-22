interface Route {
  rule: string | RegExp
  cb: () => void
  options?: object
}

function CustomRouter() {
  const routes: Route[] = []
  const root: string = '/'

  return {
    add: (rule: string | RegExp, cb: () => void, options?: object) => {
      routes.push({
        rule: rule,
        cb: cb,
        options: options
      })
    },
    navigateTo: (path: string, state?: object) => {
      window.history.pushState(state, '', root + path)
      const targetRoute = routes.find((route: Route) => {
        return path === route.rule
      })
      if (targetRoute) {
        targetRoute.cb()
      }
    }
  }
}

export default CustomRouter
