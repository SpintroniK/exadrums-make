<template>
  <section class="section">
    <p v-html="content"></p>  
  </section>
</template>

<script>

import marked from 'marked'

const files = ['/md/software.md', '/md/software-install.md']

export default {

  data()
  {
    return {
      content: ''
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
  async mounted()
  {
    const filesMasks = this.qrData.steps[this.activeStep]
    for(let file of files)
    {
      const response = await fetch(file) 
      this.content += marked(await response.text(), {})
    }
  }
  
}
</script>

<style>
.main-content h1
{
  font-size: 2.5rem;
}
</style>