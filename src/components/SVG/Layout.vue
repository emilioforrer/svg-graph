<template>
  <div class="flex flex-wrap flex-row px-6">
    <div class="w-3/4">
      <div ref="graph" class="" :style="layoutStyle">
      </div>
    </div>
    <div class="w-1/4">
      <h4>
        Properties
      </h4>
      <sidebar v-if="currentStep.uuid" :step="currentStep" @stepChange="onStepChange" />
    </div>
  </div>
</template>

<script>
import data from './data'
import Sidebar from './Sidebar'
import StepManager from './services/StepManager'

export default {
  name: 'SvgLayout',
  components: {
    'sidebar': Sidebar
  },
  data () {
    return {
      currentStep: {},
      layoutStyle: {
        'height': "800px",
        'overflow-y': 'auto',
      },
      svg: null,
      data: data,
      layer: {}
    }
  },
  mounted () {
    this.stepManager = StepManager.make({
      el: this.$refs.graph,
      steps: this.data.steps
    })

    this.stepManager.eventBus.on('step.element.container.click', (elementStep)=>{
        this.currentStep = elementStep.step
    }) 
    
  },
  methods: {
    onStepChange (step) {
      let children = Array.from(step.element.container.node.children)
      var [rect, text] = children
      
      text.firstChild.innerHTML = `${step.title}`
      text.lastChild.innerHTML = `${step.description}`
      rect.setAttribute("fill", step.meta.color)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
