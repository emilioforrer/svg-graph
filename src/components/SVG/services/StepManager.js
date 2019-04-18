import * as SVG from 'svg.js'
import 'svg.draggy.js'
import 'svg.connectable.js'
import StepElement from './StepElement'
import {EventEmitter2} from 'eventemitter2'
import uuid from 'uuid/v4'

class StepManager {
    static make (options = {}) {
        return new this.prototype.constructor(options)
    }

    constructor (options = {}) {
        this.connections = {}
        this.eventBus = new EventEmitter2()
        this.currentStep = {}
        this.initialSteps = options.steps || []
        this.steps = []
        this.stepsGrouped = {}
        this.svg = new SVG(options.el).size('100%', '100%')
        this.layer = {
            markers: this.svg.group(),
            links: this.svg.group(),
            nodes: this.svg.group()
        }
        this.initialSteps.map((s)=>{
            this.addStep(s)
        })
        this.reconnectSteps()
        this.eventBus.on('step.element.circle.click', (elementStep)=>{
            this.onAddStepClick(elementStep)
        })

        this.eventBus.on('step.element.container.dragend', (event, elementStep)=>{
            this.onElementDragEnd(event, elementStep)
        })
    }

    connectStepTo (step, nextStep) {
        let key = `${step.uuid}|${nextStep.uuid}`
        if (!this.connections[key]) {
            this.connections[key] = {
                step,
                nextStep
            }
            step.element.container.connectable({
                container: this.layer.links,
                markers: this.layer.markers
            }, nextStep.element.container).setLineColor("#5D4037");
        }
    }

    onElementDragEnd (event, elementStep) {
        let svgMatrix = event.target.getCTM()
        elementStep.step.meta.x = svgMatrix.e
        elementStep.step.meta.y = svgMatrix.f
    }

    onAddStepClick (prevStep) {
        let svgMatrix = prevStep.container.node.getCTM()
        let step = {
          uuid: uuid(),
          title: 'Title',
          description: 'Description',
          end_available: false,
          input_expected: 3,
          next_step_uuids: [],
          executors: [],
          meta: {
            x: svgMatrix.e,
            y: svgMatrix.f + prevStep.step.meta.height + 50,
            color: "#C2185B",
            width: 200,
            height: 100,
            borderRadius: 5
          }
        }
        this.addStep(step, prevStep.step)
    }

    reconnectSteps () {
        this.steps.map((step)=>{
            step.next_step_uuids.map((uuid)=>{
                let nextStep = this.stepsGrouped[uuid]
                if (nextStep) {
                    this.connectStepTo(step, nextStep)
                }
            })
        })
    }

    addStep (step, prevStep = null) {
        if (!step.element) {
            step.element = new StepElement(this, step)
        }
        if (!this.stepsGrouped[step.uuid]) {
            this.steps.push(step)
        }
        this.stepsGrouped[step.uuid] = step
        if (prevStep) {
            this.connectStepTo(prevStep, step)
        }
    }
    
}

export default StepManager