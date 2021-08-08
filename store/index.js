export const strict = false

export const state = _ => ({

    steps:
    [
      {
          label: 'Home',
          icon: 'home',
          // content: 'Home',
          to: 'index',
          displayed: true,
      },
      {
          label: 'Software',
          icon: 'laptop-code',
          // content: 'Software guidelines: how to install and use it.',
          to: 'software',
          displayed: true,
      },
      {
          label: 'Hardware',
          icon: 'microchip',
          // content: 'Hardware: Lorem ipsum dolor sit amet.',
          to: 'hardware',
          displayed: true,
      },
      {
          label: 'Case',
          icon: 'cube',
         // content: 'Videos: Lorem ipsum dolor sit amet.',
          to: 'case',
          displayed: true,
      }
    ],

    activeStep: 0,

    qrData: {v: 0, s: 0}

})

export const getters = {        // this.$store.getters.getSteps...
    getSteps: state => _ => {
        return state.steps   
    },
    getActiveStep: state => _ => {
        return state.activeStep
    },
    getQrData: state => _ => {
        return state.qrData
    }
}

export const mutations = {
    setSteps(state, steps)
    {
        state.steps = [...steps]
    },
    setActiveStepId(state, id)
    {
        state.activeStep = id % state.steps.length
    },
    setQrData(state, data)
    {
        state.qrData = {...data}
        if('steps' in state.qrData)
        {
            state.qrData.steps = [...data.steps]
        }
    }
}