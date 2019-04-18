<template>
  <div>
    <form class="bg-white px-3  pt-6 pb-8 mb-4">
        <div class="mb-4">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="title">
                Title
            </label>
            <input
                v-model="step.title"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Title">
        </div>
        <div class="mb-4">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="description">
                Description
            </label>
            <input
                v-model="step.description"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                type="text"
                placeholder="Description">
        </div>
        <div class="mb-4">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="color">
                Color
            </label>
            <input
                v-model="step.meta.color"
                type="color"
                class=""
                id="color"
                placeholder="Color">
        </div>
    </form>
  </div>
</template>

<script>


export default {

    model: {
        prop: 'step',
        event: 'input'
    },
    props: {
        step: {
            type: Object,
            required: true
        }
    },
    methods: {
      sync () {
          this.$emit('stepChange', this.step)
      }
    },
    watch: {
        'step.title': {
            handler () {
                this.sync()
            }
        },
        'step.description': {
            handler () {
                this.sync()
            }
        },
        'step.meta.color': {
            handler () {
                this.sync()
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
