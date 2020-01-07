<template>
  <q-select 
    v-model="model"
    :options="filteredOptions"
    map-options
    use-input
    hide-selected
    fill-input
    @filter="(val, update) => {filterNoDS(val,update)}"
    @input="input"
    v-bind="$attrs"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          Tidak Ada Hasil
        </q-item-section>
      </q-item>
    </template>
    <!-- <template v-if="row.component" v-slot:append>
      <q-btn round dense flat icon="add" @click="showDialog(row)" />
    </template> -->
  </q-select>
</template>

<script>
export default {
  name: 'SelectFilter',
  props: {
    options: Array,
    value: [Number,String,Object],
  },
  data () {
    return {
      model: null,
      filteredOptions: [],
      defaultOptions: null,
      afterMount: false
    }
  },
  methods: {
    filterNoDS(val, update) {
      if (val === '') {
        update(() => {
          this.filteredOptions = this.defaultOptions
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.filteredOptions = this.defaultOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },

    input(val) {
      // console.log('input',val)
      // this.$emit('input',val)
    },
  },
  watch: {
    options(val) {
      if (!this.afterMount)
        return
      // console.log('options',val)
      this.defaultOptions = [...this.options]
    },
    value(val) {
      if (!this.afterMount)
        return
      // console.log('value',val, this.options)
      if (typeof val !== 'object' && val != null) {
        this.model = this.options.find((el) => {
          return el.value == this.value
        })
      } else if (val != null) {
        this.model = val
      } else {
        this.model = null
      }
    },
    model(val, oldVal) {
      if (!this.afterMount)
        return
      if (!oldVal || !val) {
        this.$emit('input',val)
      } else {
        if (val.value !== oldVal.value) {
          this.$emit('input',val)
        }
      }

      console.log('model',val)
      if (!isNaN(val)) {
        // console.log('a',this.value)
        this.model = this.options.find((el) => {
          return el.value == this.value
        })
        // console.log('a',this.model)
      }
    }
  },
  mounted() {
    if (this.options) {
    //   // console.log('wopts')
      setTimeout(() => {
        this.defaultOptions = []
        // this.defaultOptions = [...this.options]
        for (let index = 0; index < this.options.length; index++) {
          const element = this.options[index];
          this.defaultOptions.push(element);
          if (element.value == this.value) {
            this.model = element
          }
        }
        // this.defaultOptions = [...this.options]
        // if (this.value !== '') {
        //   this.model = this.options.find((el) => {
        //     return el.value == this.value
        //   })
        // }
      
      
        
        this.afterMount = true
      }, 0);
    } else {
    //   // console.log('noopts')
      this.model = this.value
      setTimeout(() => {
        // this.defaultOptions = [...this.options]
        this.afterMount = true
      }, 0);
    }
  },
}
</script>

<style>
</style>
