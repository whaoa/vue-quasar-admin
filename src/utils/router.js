/**
 * 根据权限过滤路由配置
 * @param routerArray {Array} - 路由配置数组
 * @param role {String} - 权限信息
 * @returns Promise{Array<{
 *  name: String,
 *  path: String,
 *  meta: Object,
 *  children: Array | undefined,
 *  componentName: String | undefined,
 * }>}
 */
export const filterRoutes = async (routerArray, role) => {
  if (!routerArray || !routerArray.length) return undefined
  // 遍历路由配置列表
  return routerArray.reduce(async (result, route) => {
    const { name, meta, path, component } = route
    // 如果路由设置了权限，且登录账号权限不是 admin，则判断使用有权限访问该路由
    if (meta.auth && role !== 'admin' && !meta.auth.includes(role)) return result
    // 递归生成子路由配置
    const children = await filterRoutes(route.children, role)
    // 如果过滤后子路由为空则跳过
    if (route.children && !children) return result
    const item = { name, path, meta, children }
    // 如果配置了缓存 cache 属性 并且 有 component 方法, 则设置组件名称 (不处理布局组件)
    if (!route.children && meta.cache && component) {
      item.componentName = (await component()).default.name
    }
    const data = await result
    data.push(item)
    return data
  }, [])
}

/**
 * 拉平路由配置列表
 * @param routes {Array} - 路由配置数组
 * @returns {Promise<Array>}
 */
export const flatRoutes = (routes = []) => routes.reduce((result, route) => {
  if (route.children) result.push(...flatRoutes(route.children))
  else result.push(route)
  return result
}, [])
