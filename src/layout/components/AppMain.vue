<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppMain',
  data() {
    return {
      key: 0,
    }
  },
  computed: {
    ...mapGetters([
      'projectActive',
    ]),
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
  },
  watch: {
    projectActive: {
      handler: function() {
        this.key++
      }
    },
  }
}
</script>
<style lang="scss" scoped>
  .app-main {
    position: relative;
    /* 50= navbar  50  */
    padding-top: 50px;
    width: 100%;
    // min-height: calc(100vh - 50px);
    min-height: 100vh;
    overflow: auto;
    background: #fff;
  }

  .hasTagsView {
    .app-main {
      /* 84 = navbar + tags-view = 50 + 34 */
      // min-height: calc(100vh - 84px);
      padding-top: 84px;
    }

  }
</style>

<style lang="scss">
  // fix css style bug in open el-dialog
  .el-popup-parent--hidden {
    .fixed-header {
      padding-right: 15px;
    }
  }
</style>
