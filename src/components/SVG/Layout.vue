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
import * as SVG from 'svg.js'
import 'svg.draggy.js'
import 'svg.connectable.js'
import data from './data'
import Sidebar from './Sidebar'

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
    this.makeLayout()
    this.createStepElements()
    this.connectElements()
  },
  computed: {
    
    groupedData () {
      return this.groupBy(this.data.steps, d => d.uuid)
    }
  },
  methods: {
    onStepChange (step) {
      let children = Array.from(step.element.node.children)
      var [rect, text, circle] = children
      
      text.firstChild.innerHTML = `${step.title}`
      text.lastChild.innerHTML = `${step.description}`
      rect.setAttribute("fill", step.meta.color)
    },
    connectElements () {
      Object.entries(this.groupedData).forEach(([key, step]) => {
        for (const uuid of step.next_step_uuids) {
          let nextStep = this.groupedData[uuid]
          if (nextStep) {
            this.connectStepTo(step, nextStep)
          }
        }
      })
    },
    connectStepTo (step, nextStep) {
      step.element.connectable({
          container: this.layer.links,
          markers: this.layer.markers
      }, nextStep.element).setLineColor("#5D4037");
    },
    makeLayout() {
      this.svg = new SVG(this.$refs.graph).size('100%', '100%')
      this.layer.markers = this.svg.group()
      this.layer.links = this.svg.group()
      this.layer.nodes = this.svg.group()
    },
    createStepElements () {
      Object.entries(this.groupedData).forEach(([key, value]) => {
        let step = this.assignElementToStep(value)   
        this.groupedData[key] = step
      })
    },
    assignElementToStep (step) {
      const nodes = this.layer.nodes
      let stepElment = nodes.group().translate(step.meta.x, step.meta.y).draggy();
      let rect = stepElment.rect(step.meta.width, step.meta.height)
        .fill(step.meta.color)
        .radius(step.meta.borderRadius)
        
      let text = stepElment.text(`${step.title}\n${step.description}`)
        
      let circumference = 30
      let circle = stepElment.circle(circumference)
        .fill('#f06')
        .move((step.meta.width / 2) - (circumference / 2)  , step.meta.height)
      let circleText = stepElment.text('+')
        .attr({ x: circle.x() + (circumference / 2) - 5, y: circle.y() })
        .fill('white')
        .font('weight', 'Bold')
      step.element = stepElment
      circleText.on('click', (e) => {
        e.stopPropagation()
        this.onAddStepClick(e, step)
      })
      circle.on('click', (e) => {
        e.stopPropagation()
        this.onAddStepClick(e, step)
      })
      stepElment.on('dragend', (event) => {
        this.onElementDragEnd(event, step, rect)
      })
      stepElment.on('click', (e) => {
        this.currentStep = step
      })
      return step
    },
    onElementDragEnd (event, step, rect) {
      let svgMatrix = event.target.getCTM()
      step.meta.x = svgMatrix.e
      step.meta.y = svgMatrix.f
    },
    onAddStepClick (e, prevStep) {
      let svgMatrix = prevStep.element.node.getCTM()
      let step = {
        uuid: new Date().getTime(),
        title: 'Title',
        description: 'Description',
        end_available: false,
        input_expected: 3,
        next_step_uuids: [],
        executors: [],
        meta: {
          x: svgMatrix.e,
          y: svgMatrix.f + prevStep.meta.height + 50,
          color: "#C2185B",
          width: 200,
          height: 100,
          borderRadius: 5
        }
      }
      step = this.assignElementToStep(step)
      this.connectStepTo(prevStep, step)
      this.data.steps.push(step)
    },
    
    groupBy(list, keyGetter) {
        const map = {};
        list.forEach((item) => {
            const key = keyGetter(item)
            const collection = map[key]
            if (!collection) {
                map[key] = item //[item];
            } else {
                collection.push(item)
            }
        });
        return map;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
