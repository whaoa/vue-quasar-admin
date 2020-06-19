export default {
  name: 'SideBarMenus',
  props: {
    menus: {
      type: Array,
      required: true,
    },
  },
  methods: {
    // 生成组件树
    renderMenus (createElement, data) {
      const result = []
      data.forEach(item => {
        const { meta = {}, children, name } = item
        // 如果设置不显示
        if (meta.hidden) return
        // 如果包含子路由
        if (children && children.length) {
          const group = createElement('q-expansion-item', {
            props: {
              group: meta.name,
              label: meta.title,
              icon: meta.icon,
              defaultOpened: this.$route.matched.some(i => i.name === name),
            },
          }, this.renderMenus(createElement, children))
          result.push(group)
          result.push(createElement('q-separator'))
          return
        }
        // 菜单项
        const icon = createElement('q-item-section', { props: { avatar: true } }, [createElement('q-icon', { props: { name: meta.icon } })])
        const label = createElement('q-item-section', {}, [meta.title])
        result.push(createElement('q-item', {
          props: {
            to: { name },
            clickable: true,
            active: this.$route.name === name,
          },
          class: this.$route.name === name ? 'bg-grey-3 text-black' : 'text-black',
          directives: [
            { name: 'ripple', value: true },
          ],
        }, [icon, label]))
      })
      return result
    },
  },
  render (createElement) {
    const menus = this.renderMenus(createElement, this.menus)
    return createElement('q-list', { props: { padding: true } }, [menus])
  },
}
