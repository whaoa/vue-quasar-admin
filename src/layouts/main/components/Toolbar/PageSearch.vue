<template>
  <q-select
    class="toolbar-input"
    dense
    outlined
    use-input
    v-model="model"
    label="搜索页面功能"
    :options="options"
    @filter="filter"
    @input="handleOptionClick"
    transition-show="jump-up"
    transition-hide="jump-down"
  >
    <template v-slot:option="scope">
      <q-intersection transition="jump-up">
        <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
          <q-item-section avatar>
            <q-icon :name="scope.opt.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label v-html="scope.opt.label" />
            <q-item-label caption>{{ scope.opt.description }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-intersection>
    </template>
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          没有找对包含改内容的结果
        </q-item-section>
      </q-item>
    </template>
    <template v-if="model" v-slot:append>
      <q-icon name="cancel" @click.stop="model = null" class="cursor-pointer"/>
    </template>
  </q-select>
</template>

<script>
import routes from '@/router/routes'

function deepMap (routerArray) {
  return routerArray.reduce((t, c) => {
    if (c.meta && c.meta.hidden) return t
    const { meta = {}, name, children } = c
    if (children) {
      t.push(...deepMap(children))
    } else {
      t.push({
        label: meta.title || name,
        icon: meta.icon,
        name,
      })
    }
    return t
  }, [])
}

const options = deepMap(routes)

export default {
  name: 'PageSearch',
  data () {
    return {
      model: null,
      options,
    }
  },
  methods: {
    // 搜索过滤
    filter (val, update) {
      if (!val) {
        update(() => { this.options = options })
        return
      }

      update(() => {
        this.options = options.filter(i => i.label.includes(val))
      })
    },
    // 选项点击
    handleOptionClick ({ name }) {
      this.$router.push({ name })
    },
  },
}
</script>

<style scoped>
  .toolbar-input {
    width: 55%;
  }
</style>
