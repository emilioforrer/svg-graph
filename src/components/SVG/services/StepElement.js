class StepElement {

    constructor (manager, step) {
        this.manager = manager
        const nodes = this.manager.layer.nodes
        this.step = step
        this.container = nodes.group().translate(step.meta.x, step.meta.y).draggy()
        this._createRect(step)
        this._createText(step)
        this._createCircle(step)
        this.container.on('click', () => {
            this.manager.eventBus.emit('step.element.container.click', this)
        })

        this.container.on('dragend', (event) => {
            this.manager.eventBus.emit('step.element.container.dragend', event, this)
        })
    }

    _createCircle (step) {
        let circumference = 30
        this.circle = this.container.circle(circumference)
            .fill('#f06')
            .move((step.meta.width / 2) - (circumference / 2)  , step.meta.height)
        this.circleText = this.container.text('+')
            .attr({ x: this.circle.x() + (circumference / 2) - 5, y: this.circle.y() })
            .fill('white')
            .font('weight', 'Bold')
        this.circleText.on('click', (e) => {
            e.stopPropagation()
            this.manager.eventBus.emit('step.element.circle.click', this)
        })
        this.circle.on('click', (e) => {
            e.stopPropagation()
            this.manager.eventBus.emit('step.element.circle.click', this)
        })
    }

    _createText (step) {
        this.text =  this.container.text(`${step.title}\n${step.description}`)
    }

    _createRect (step) {
        this.rect = this.container.rect(step.meta.width, step.meta.height)
            .fill(step.meta.color)
            .radius(step.meta.borderRadius)
    }

}

export default StepElement