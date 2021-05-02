<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body columns">
        <div class="container colmun is-10">
          <h1 class="title">
            eXaDrums Maker
          </h1>
          <h2 class="subtitle">
            Make your drum module
          </h2>
        </div>
        <div class="column is-1">
          <a>
            <b-tooltip label="Permalink" position="is-bottom" type="is-dark">
              <b-icon icon="link"></b-icon>
            </b-tooltip>
          </a>
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
    <qrcode-vue :value="'https://make.exadrums.com?d='+JSON.stringify(qrData)" size="160" renderAs="canvas"></qrcode-vue>
  </div>
</template>

<script>

import QrcodeVue from 'qrcode.vue'

const codec = require('json-url')('lzw')

export default {
  components: 
  {
    QrcodeVue,
  },
  data () {
    return {
      qrData: {v: 0, s: 0, steps: []},
      activeStep: 0,
      steps:
      [
        {
            label: 'Home',
            icon: 'home',
            content: 'Home',
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
    async stepTopage()
    {
      this.qrData.s = this.activeStep
      const str = await codec.compress(this.qrData)
      console.log(str)
      this.$router.push({name: this.steps[this.activeStep].to, query:{d: str}})
    },
    setRouteStep()
    {
      const routeName = this.$route.name
      this.activeStep = this.steps.findIndex(s => s.to === routeName)

      // this.$buefy.toast.open({message: `active step = ${this.activeStep}`, queue:false})
    }
  },
  async mounted()
  {
    this.qrData.steps = [...this.steps.keys()]
    const params = new URLSearchParams(window.location.search)
    const d = params.get('d')
    if(d)
    {
      console.log(`data = ${d} [${d.length}]`)
      const json = await codec.decompress(d)
      console.log(json)

      if(typeof json === 'object')
      {
        this.qrData = json
        if('steps' in json)
        {
          const stepsIndexes = json.steps
          this.steps = this.steps.filter((v, i, a) => stepsIndexes.includes(i))
        }
        const jsonStr = JSON.stringify(json)
        console.log(`data = ${jsonStr} [${jsonStr.length}]`)
      }
    }
    this.activeStep = this.qrData.s
    this.stepTopage()
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
