<template>
  <q-input
    class="toolbar-input"
    color="bg-grey-7"
    outlined
    dense
    v-model="search"
    placeholder="搜索页面功能"
  >
    <template v-slot:prepend>
      <q-icon v-if="search === ''" name="search"/>
      <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''"/>
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'HeaderSearch',
  data () {
    return {
      search: '',
    }
  },
}
</script>

<style scoped>
  .toolbar-input {
    width: 55%;
  }
</style>
