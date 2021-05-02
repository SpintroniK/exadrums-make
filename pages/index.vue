<template>
  <section class="container">
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

export default {
  name: 'HomePage',
  data()
  {
    return { steps: [{label: 'Home'}, {label: ''}]}
  },
  mounted()
  {
  },
  methods:
  {
    nextStep()
    {
      this.$router.push({name: 'NextStep'})
    }
  }

}
</script>
