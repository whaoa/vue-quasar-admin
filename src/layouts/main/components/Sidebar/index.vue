<template>
  <q-scroll-area class="fit">
    <menus :menus="routes" />
    <div class="q-px-md text-grey-9">
      <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
        <a
          v-for="button in buttons"
          :key="button.text"
          class="drawer-footer-link"
          href="javascript:void(0)"
        >
          {{ button.text }}
        </a>
      </div>
    </div>
  </q-scroll-area>
</template>

<script>
import { mapState } from 'vuex'
import Menus from './Menus'

export default {
  name: 'Sidebar',
  components: { Menus },
  data () {
    return {
      buttons: [
        { text: 'About' },
        { text: 'Press' },
        { text: 'Copyright' },
        { text: 'Contact us' },
        { text: 'Creators' },
        { text: 'Advertise' },
        { text: 'Developers' },
      ],
    }
  },
  computed: {
    ...mapState('qadmin/page', ['routes']),
  },
}
</script>

<style scoped lang="scss">
  .drawer-item {
    line-height: 24px;

  .q-item__section--avatar {
  .q-icon {
    color: #5f6368;
  }
  }

  .q-item__label {
    color: #3c4043;
    letter-spacing: .01785714em;
    font-size: .875rem;
    font-weight: 500;
    line-height: 1.25rem;
  }
  }


  .drawer-footer-link {
    color: inherit;
    text-decoration: none;
    font-weight: 500;
    font-size: .75rem;

  &:hover {
     color: #000;
   }
  }
</style>
