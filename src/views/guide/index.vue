<template>
  <div class="app-container">
    <p class="warn-content">
      {{ $t('guide.description') }}
      <a href="https://github.com/kamranahmedse/driver.js" target="_blank">driver.js.
      </a>
    </p>
    <el-button icon="el-icon-question" type="primary" @click.prevent.stop="guide">
      {{ $t('guide.button') }}
    </el-button>
  </div>
</template>

<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import { steps_en, steps_zh } from './defineSteps'

export default {
  name: 'Guide',
  data() {
    return {
      driver: null
    }
  },
  mounted() {
    this.driver = new Driver()
  },
  methods: {
    guide() {
      this.$store.dispatch('settings/changeSetting', {
        key: 'showSettings',
        value: true
      })
      const lang = this.$store.state.app.language
      console.log(lang)
      if (lang === 'zh') {
        this.driver.defineSteps(steps_zh)
        this.driver.start()
      } else {
        this.driver.defineSteps(steps_en)
        this.driver.start()
      }
    }
  }
}
</script>
