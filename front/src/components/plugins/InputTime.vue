<template>
  <q-input v-bind="$attrs" @focus="onFocus" @blur="onBlur" v-model="model" :mask="mask">
    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy>
          <q-time v-bind="$attrs" v-model="model" format24h />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
import { date } from 'quasar'

export default {
  name: "InputTime",
  props: {
    value: String,
    display: {
      type: String,
      default: 'HH:mm:ss'
    },
    mask: {
      type:String,
      default: '##:##'
    }
  },
  data () {
    return {
      model: this.value || '',
      curVal: this.value || ''
    }
  },
  watch: {
    value(val) {
      console.log(val,'reval')
      this.model = val
      // this.model =  date.formatDate(val, 'HH:mm:ss')
    }
  },
  computed: {
    displayVal() {
      return date.formatDate(this.value, this.display)
    }
  },
  methods: {
    onFocus() {
      this.curVal = this.model
    },
    onBlur() {
      // if (!date.isValid(this.model)) {
        //   this.model = this.curVal
      // } else {
        //   this.model = date.formatDate(this.model, 'HH:mm:ss')
      // }
      console.log(this.model)
      this.$emit('input',this.model)
    },
    doPopup() {
      this.$refs['popup'].show()
    },
    doBlur() {
      this.$refs['input'].blur()
    }
  },
  mounted() {
    // this.model = value
    // this.model =  date.formatDate(this.value, 'HH:mm:ss')
    // this.$emit('input',this.model)
  }
}
</script>

<style>
</style>
