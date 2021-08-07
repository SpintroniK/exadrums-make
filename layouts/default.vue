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
          <a @click="isPermalink=true">
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
          <!-- {{ step.content }} -->
        </b-step-item>
      </template>
    </b-steps>

    <section class="main-content">
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
        <nuxt />
    </section>
    <b-modal v-model="isPermalink" class="has-text-centered">
      <p class="title">
        <qrcode-vue :value="url" size="160" renderAs="canvas"></qrcode-vue>
        <b-field position="is-centered">
          <b-input maxlength="64" v-model="url" type="search" disabled></b-input>
          <p class="control">
            <b-button label="Copy" type="is-info" @click="copyUrl" />
          </p>
        </b-field>
      </p>
    </b-modal>
  </div>
</template>

<script>

import QrcodeVue from 'qrcode.vue'

const codec = require('json-url')('lzw')

export default {
  components: 
  {
    QrcodeVue
  },
  data () {
    return {
      url: '',
      urlData: '',
      isPermalink: false
    }
  },
  computed:
  {
    steps:
    {
      get()
      {
        return this.$store.getters.getSteps()
      },
      set(value)
      {
        this.$store.commit('setSteps', value)
      }
    },
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

    async computeUrl()
    {
      const str = await codec.compress(this.qrData)
      this.urlData = str
      this.url = `https://make.exadrums.com/?d=${str}`
    },
    getUrlData()
    {
      const params = new URLSearchParams(window.location.search)
      const d = params.get('d')
      return d
    },
    async copyUrl()
    {
      this.computeUrl()
      try
      {
        this.$copyText(this.url)
        this.$buefy.toast.open({ message: 'Copied url to clipboard!', type: 'is-success'})
      }
      catch(e)
      {
        console.log(e)
      }
    },
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
      this.computeUrl()
      // this.$buefy.toast.open({message: `active step = ${this.activeStep}`, queue:false})
    },
  },
  async mounted()
  {
    this.qrData.steps = [...this.steps.keys()]
    const d = this.getUrlData()
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
    this.computeUrl()
  },
  watch: 
  {
    async $route() 
    {
      this.setRouteStep()
    },
  },
}
</script>
