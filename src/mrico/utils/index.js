import {getList, getLifeCycle} from "../const/subApp";

export const patchRouter = (globalEvent, eventName) => {
  return function () {
    const e = new Event(eventName);
    globalEvent.apply(this, arguments);
    window.dispatchEvent(e);
  };
};

export const turnApp = async () => {
  if (isChildTurn()) {
    const prevApp = findAppByRoute(window['__ORIGIN_APP__'])
    const nextApp = findAppByRoute(window['__CURRENT_SUB_APP__'])
    if (!nextApp) {
      return
    }
    if (prevApp) {
      await destroy(prevApp)
    }
    const app = await beforeLoad(nextApp)
    await mounted(app)
  }
}
const beforeLoad = async (app) => {
  await dispatchLifeCycleByType('beforeLoad')
  app && app.beforeLoad && await app.beforeLoad()

  return app
}
const mounted = async (app) => {
  app && app.mounted && await app.mounted()
  return await dispatchLifeCycleByType('mounted')
}

const destroy = async (app) => {
  app && app.unmount && app.unmount()
  await dispatchLifeCycleByType('destroy')
}
const dispatchLifeCycleByType = async type => {
  const lifeCycles = getLifeCycle()[type]
  return await Promise.all(lifeCycles.map(async lifeCycle => await lifeCycle()))
}
export const currentApp = () => {
  const currentUrl = window.location.pathname

  return filterApp('url', currentUrl)
}

export const findAppByRoute = (router) => {
  return filterApp('url', router)
}

export const filterApp = (key, value) => {
  const currentApp = getList().find(item => item[key] === value)

  return currentApp || undefined
}


export const isChildTurn = () => {
  window['__ORIGIN_APP__'] = window['__CURRENT_SUB_APP__']
  if (window['__CURRENT_SUB_APP__'] === window.location.pathname) {
    return false
  }
  const path = window.location.pathname.match(/(\/\w+)/)
  if (!path) {
    return false
  }
  window['__CURRENT_SUB_APP__'] = path[0]
  return true
}
