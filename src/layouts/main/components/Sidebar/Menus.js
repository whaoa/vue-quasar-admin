import { openURL } from 'quasar'

export default {
  name: 'SideBarMenus',
  props: {
    // 需要渲染的路由配置数组
    menus: {
      type: Array,
      required: true,
    },
  },
  methods: {
    // 生成组件树
    renderMenus (createElement, data) {
      return data.reduce((result, route, index) => {
        const { meta = {}, children, name } = route
        // 如果设置不显示
        if (meta.hidden) return result
        // 如果包含子路由
        if (children && children.length) {
          // 创建折叠菜单
          const group = createElement('q-expansion-item', {
            props: {
              group: meta.name,
              label: meta.title,
              icon: meta.icon,
              defaultOpened: this.$route.matched.some(i => i.name === name),
            },
          }, this.renderMenus(createElement, children)) // 递归生产子路由组件
          result.push(group)
          // 添加分割线
          result.push(createElement('q-separator'))
          return result
        }
        // 如果是菜单项
        const icon = createElement('q-item-section', { props: { avatar: true } }, [createElement('q-icon', { props: { name: meta.icon } })])
        const label = createElement('q-item-section', {}, [meta.title])
        // 菜单项属性对象
        const attrs = {
          props: {
            to: { name },
            clickable: true,
            active: this.$route.name === name,
          },
          class: this.$route.name === name ? 'bg-grey-3 text-black' : 'text-black',
          // Material 波纹效果
          directives: [{ name: 'ripple', value: true }],
        }
        // 如果是外部链接路由
        if (meta.href) {
          attrs.props.to = undefined
          attrs.on = {
            click () { openURL(meta.href) },
          }
        }
        result.push(createElement('q-item', attrs, [icon, label]))
        // 如果不是最后一项，添加分割线
        if (index !== data.length - 1) result.push(createElement('q-separator'))
        return result
      }, [])
    },
  },
  render (createElement) {
    const menus = this.renderMenus(createElement, this.menus)
    return createElement('q-list', { props: { padding: true } }, [menus])
  },
}
