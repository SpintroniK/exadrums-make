<template>
  <section class="section">
    <h1 class="title">How does this work?</h1>
    <p class="has-text-justified">
      This documentation is customizable, if you are coming from 
      <a href="https://configure.exadrums.com" target="_blank">configure.exadrums.com</a> 
      you are alreading reading your custom documentation, otherwise, you are reading the full documentation.
    </p>
    <p class="has-text-justified">
      This site is divided into steps which will guide you into making your own drum module (the icons at the top of the page are clickable).
      So, if you are ready to start that journey and build your own custom drum module, click the 'Next Step' button!
      Note that you can save your progress at any time by clicking the permalink icon at the top of the page.
    </p>
    <p class="has-text-right">
        <b-button @click="nextStep" icon-right="angle-double-right">Next Step</b-button>
    </p>
  </section>
</template>

<script>

const codec = require('json-url')('lzw')

export default {
  name: 'HomePage',
  data()
  {
    return { 
    }
  },

  computed:
  {
    activeStep:
    {
      get()
      {
        return this.$store.getters.getActiveStep()
      },
      set(value)
      {
        this.$store.commit('setActiveStepId', value)
      }
    },
    qrData:
    {
      get()
      {
        return this.$store.getters.getQrData()
      },
      set(value)
      {
        this.$store.commit('setQrData',value)
      }
    }
  },
  methods:
  {

    async nextStep()
    {
      this.activeStep++
      const str = await codec.compress(this.qrData)
      this.$router.push({name: this.$store.getters.getSteps()[this.activeStep].to, query:{d: str}})
    },

  },
  mounted() 
  {

  }
}
</script>