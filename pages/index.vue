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
      <!-- <div>
        <div class="container has-text-centered">
          <h1 class="title">Customize your kit</h1>
        </div>
        <div class="container">
          <div class="columns has-text-justified">
            <div class="column">
              <section class="section">
                Number of triggers left: {{nbTriggersLeft}}
                  <b-taginput :value="instrumentsNames" @input="removeInstrument">
                </b-taginput>
              </section>
            </div>
            <div class="column">
              <section class="section">
                <h2 class="subtitle">Add instrument</h2>
                <b-field label="Name">
                    <b-input v-model="currentInstrument.name"></b-input>
                </b-field>
                <section>
                  <b-dropdown :scrollable="true" v-model="selectedInstrumentMenu" aria-role="list" class="mb-3">
                      <template #trigger="{ active }">
                          <b-button :label="selectedInstrumentMenu.text" type="is-primary" :icon-left="selectedInstrumentMenu.icon" 
                                    :icon-right="active ? 'angle-up' : 'angle-down'" />
                      </template>
                      <b-dropdown-item v-for="(menu, index) in instrumentsMenu" :key="index" :value="menu" aria-role="listitem">
                          <div class="media">
                              <b-icon class="media-left" :icon="menu.icon"></b-icon>
                              <div class="media-content">
                                  <h3>{{menu.text}}</h3>
                              </div>
                          </div>
                      </b-dropdown-item>
                  </b-dropdown>
                </section>
                <section>
                    <b-dropdown :scrollable="true" aria-role="list" v-model="selectedTriggerMenu" class="mb-3">
                      <template #trigger="{ active }">
                          <b-button :label="selectedTriggerMenu.name" type="is-primary" :icon-right="active ? 'angle-up' : 'angle-down'" />
                      </template>
                      <b-dropdown-item v-for="(item, index) in triggersMenu" :key="index" aria-role="listitem" :value="item">{{item.name}}</b-dropdown-item>
                  </b-dropdown>
                </section>
                <b-button icon-left="plus" type="is-primary" @click="addInstrument" :disabled="nbTriggersLeft - selectedTriggerMenu.nb_sensors < 0">
                    Add
                </b-button>
              </section>
            </div>
          </div>
          <div class="container" id="canvas-container">
            <div v-bind:style="{ height: '100%', width: '100%' }" ref="container">
              <v-stage ref="stage" :config="stageSize" @mousedown="handleStageMouseDown" @touchstart="handleStageMouseDown">
                <v-layer ref="layer">
                  <v-group v-for="(instrument, i) in instruments" :key="i" 
                          :config="{ draggable: true }" 
                          @dragstart="handleDragStart" @dragend="handleDragEnd">
                    <v-image :config="{
                        name: toCodeName(instrument.text),
                        image: instrument.image,
                        x: 0,
                        y: 0,
                        width: 100,
                        height: 100
                      }" @transformend="handleTransformEnd" />
                    <v-text ref="text" :config="{
                        text: instrument.text,
                        x: 0,
                        y: -15,
                        fontSize: 20,
                        fontFamily: 'Calibri',
                        fill: 'black',
                        draggable: true
                      }" />
                  </v-group>
                  <v-transformer ref="transformer" />
                </v-layer>
              </v-stage>
            </div>
          </div>
        </div>
      </div> -->
  
  </section>
</template>

<script>

const codec = require('json-url')('lzw')

export default {
  name: 'HomePage',
  data()
  {
    // const instrumentsMenu = [
    //   { icon: 'drum', text: 'Snare Drum', imageName: 'snare' },
    //   { icon: 'drum', text: 'Bass Drum', imageName: 'bassdrum' },
    //   { icon: 'drum', text: 'Tom', imageName: 'snare' },
    //   { icon: 'record-vinyl', text: 'Cymbal', imageName: 'cymbal' }
    // ]

    // const triggersMenu = [
    //   { name: "Pad", nb_sensors: 1},
    //   { name: "Dual Zone Pad", nb_sensors: 2},
    //   { name: "Hi-Hat", nb_sensors: 1}
    // ]

    return { 
      steps: [{label: 'Home'}, {label: ''}],


      // triggers_number: 8,
      // instruments: [],
      // images: [],
      // stageSize: { width: 300, height: 480 },
      // currentInstrument: {name: 'Snare Drum', type: 'Pad', sounds: [], triggers: [], imageName: 'cymbal', codeName: ''},
      // selectedInstrumentMenu: instrumentsMenu[0], instrumentsMenu: instrumentsMenu,
      // selectedTriggerMenu: triggersMenu[0], triggersMenu: triggersMenu,
      // selectedShapeName: ''
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

    // nbTriggersLeft()
    // {
    //   const instrumentsTriggers = this.instruments.map(i => i.trigger)

    //   let nb_used_triggers = 0

    //   for(let it of instrumentsTriggers)
    //   {
    //     const nbs = this.triggersMenu.find(t => t.name == it).nb_sensors
    //     nb_used_triggers += nbs
    //   }

    //   return this.triggers_number - nb_used_triggers
    // },
    // instrumentsNames()
    // {
    //   return this.instruments.map(i => i.text)
    // }
  },
  methods:
  {

    async nextStep()
    {
      this.activeStep++
      const str = await codec.compress(this.qrData)
      this.$router.push({name: this.$store.getters.getSteps()[this.activeStep].to, query:{d: str}})
    },

    // removeInstrument(a)
    // {
    //   this.instruments = this.instruments.filter(i => a.includes(i.text))
    // },
    // addInstrument()
    // {
      
    //   // console.log(this.$refs.text.getNode().destroy())
    //   // this.$buefy.dialog.alert(`Instrument: ${this.selectedInstrumentMenu.text}<br>Trigger : ${this.selectedTriggerMenu}`)

    //   // Avoid duplicate names
    //   if(this.instrumentsNames.includes(this.currentInstrument.name))
    //   {
    //     this.$buefy.dialog.alert({
    //         title: 'Error',
    //         message: 'An instrument with the same name already exists.',
    //         type: 'is-danger',
    //         hasIcon: true,
    //         icon: 'times-circle',
    //         iconPack: 'fa',
    //         ariaRole: 'alertdialog',
    //         ariaModal: true})
    //   }
    //   else
    //   {
    //     const instrument = this.instrumentsMenu.find(i => i.text === this.selectedInstrumentMenu.text)
    //     const currentImage = this.images.find(i => i.name === instrument.imageName).image
    //     this.instruments.push({image: currentImage, text: this.currentInstrument.name, trigger: 'Pad'})
    //   }
    // },
    // toCodeName(s)
    // {
    //   return s.replace(/\s+/g, '')
    // },
    // handleDragStart(e) 
    // {
    // },
    // handleDragEnd(e) 
    // {
    //   console.log('target elements = ', e.target.children)
    // },
    // handleTransformEnd(e)
    // {
    //   // shape is transformed, let us save new attrs back to the node
    //   // find element in our state
    //   const inst = this.instruments.find(i => this.toCodeName(i.text) === this.selectedShapeName)
    //   console.log('instrument = ', inst)
    // },
    // handleStageMouseDown(e) 
    // {
    //   // clicked on stage - clear selection
    //   if(e.target === e.target.getStage()) 
    //   {
    //     this.selectedShapeName = ''
    //     this.updateTransformer()
    //     return
    //   }

    //   // clicked on transformer - do nothing
    //   const clickedOnTransformer = e.target.getParent().className === 'Transformer'
    //   if(clickedOnTransformer) 
    //   {
    //     return
    //   }

    //   // find clicked rect by its name
    //   const name = e.target.name()
    //   const rect = this.instruments.find(i => this.toCodeName(i.text) === name)

    //   if(rect) 
    //   {
    //     this.selectedShapeName = name
    //   } 
    //   else 
    //   {
    //     this.selectedShapeName = ''
    //   }

    //   this.updateTransformer()
    // },
    // updateTransformer() 
    // {
    //   // here we need to manually attach or detach Transformer node
    //   const transformerNode = this.$refs.transformer.getNode()
    //   const stage = transformerNode.getStage()
    //   const { selectedShapeName } = this

    //   const selectedNode = stage.findOne('.' + selectedShapeName)
    //   console.log(selectedShapeName)
    //   // do nothing if selected node is already attached
    //   if(selectedNode === transformerNode.node()) 
    //   {
    //     return
    //   }

    //   if(selectedNode)
    //   {
    //     // attach to another node
    //     transformerNode.nodes([selectedNode])
    //   }
    //   else 
    //   {
    //     // remove transformer
    //     transformerNode.nodes([])
    //   }
    //   transformerNode.getLayer().batchDraw()
    // },
    // changeRect() 
    // {
    //   const container = this.$refs.container

    //   if(!container)
    //     return

    //   const height = container.offsetHeight
    //   const width = container.offsetWidth

    //   // console.log(height, height)
    //   this.stageSize.width = width
    //   this.stageSize.height = height

    //   // console.log(this.$refs.layer.getNode().children[0].position())

    // }
  },
  mounted() 
  {

    // window.addEventListener("resize", this.changeRect)
    // this.changeRect()

    // const images = [{name: 'snare', src: '/images/snare.svg'},
    //                 {name: 'cymbal', src: '/images/cymbal.svg'},
    //                 {name: 'bassdrum', src: '/images/bassdrum.svg'}]

    // for(let im of images)
    // {
    //   const image = new Image()
    //   image.src = im.src
    //   this.images.push({ name: im.name, image: image })
    // }
    // const con = this.$refs.stage.getNode().container()
  }
}
</script>


<style scoped>
  #canvas-container
  {
    height: 100%;
  }
</style>
