<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            eXaDrums Maker
          </h1>
          <h2 class="subtitle">
            Make your drum module
          </h2>
        </div>
      </div>
    </section>
    <br>
    <b-steps v-model="activeStep" :has-navigation="false" @input="stepTopage" size="is-medium" mobile-mode="compact">
      <template v-for="(step, index) in steps">
        <b-step-item v-if="step.displayed" :key="index" 
                     :visible="step.visible" :label="step.label" :icon="step.icon" :clickable="true">
          {{ step.content }}
        </b-step-item>
      </template>
    </b-steps>

    <section class="main-content columns">
      <!-- <aside class="column is-2 section">
        <p class="menu-label is-hidden-touch">
          General
        </p>
        <ul class="menu-list">
          <li
            v-for="(item, key) of items"
            :key="key"
          >
            <nuxt-link :to="item.to" :class="$route.name == item.to.name? 'is-active': ''">
              <b-icon :icon="item.icon" /> {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </aside> -->

      <div class="container column is-10">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>

export default {
  data () {
    return {
      activeStep: 0,
      steps:
      [
        {
            label: 'Home',
            icon: 'home',
            content: '',
            to: 'index',
            displayed: true,
        },
        {
            label: 'Sotware',
            icon: 'laptop',
            content: 'Software guidelines: how to install and use it.',
            to: 'software',
            displayed: true,
        },
        {
            label: 'Triggers',
            icon: 'drum',
            content: 'Triggers: Lorem ipsum dolor sit amet.',
            to: 'triggers',
            displayed: true,
        },
        // {
        //     label: 'Case',
        //     icon: 'cube',
        //     content: 'Videos: Lorem ipsum dolor sit amet.',
        //     to: 's',
        //     displayed: true,
        // }
      ]
    }
  },
  methods:
  {
    stepTopage()
    {
      this.$router.push({name: this.steps[this.activeStep].to, query:{d: 123}})
    },
    setRouteStep()
    {
      const routeName = this.$route.name
      this.activeStep = this.steps.findIndex(s => s.to === routeName)

      // this.$buefy.toast.open({message: `active step = ${this.activeStep}`, queue:false})
    }
  },
  mounted()
  {
    // var codec = require('json-url')('lzw');
	  // var obj = { one: 1, two: 2, three: [1,2,3], four: 'red pineapples' };
	  // codec.compress(obj).then(result => console.log(result));
    // const codec = require('json-url')('lzw');
	  // const json = await codec.decompress('woTCo29uZQHCo3R3bwLCpXRocmVlwpMBAgPCpGZvdXLCrsSOZCBwacSDYXBwbGVz')
    // console.log(json)
    this.setRouteStep()
  },
  watch: 
  {
    $route() 
    {
      // this.$buefy.toast.open({message: `route = ${this.$route.name}`, queue:false})
      this.setRouteStep()
    },
  },
}
</script>
