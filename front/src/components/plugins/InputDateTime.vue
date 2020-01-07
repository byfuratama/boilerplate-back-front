<template>
  <q-input v-bind="$attrs" @focus="onFocus" @blur="onBlur" v-model="model" placeholder="YYYY/MM/DD HH:mm" mask="####/##/## ##:##">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer bg-primary text-anti-primary q-pa-md rounded-borders">
        <q-popup-proxy>
          <q-date v-model="model" :mask="display" />
        </q-popup-proxy>
      </q-icon>
      <q-icon name="access_time" class="cursor-pointer bg-primary text-anti-primary q-pa-md rounded-borders">
        <q-popup-proxy>
          <q-time v-model="model" :mask="display" format24h />
        </q-popup-proxy>
      </q-icon>
    </template>

  </q-input>
</template>

<script>
import { date } from 'quasar'

export default {
  name: "InputDate",
  props: {
    value: String,
    display: {
      type: String,
      default: 'YYYY/MM/DD HH:mm'
    }
  },
  data () {
    return {
      model: this.value ? date.formatDate(this.value, this.display) : '',
      curVal: this.value ? date.formatDate(this.value, this.display) : ''
    }
  },
  watch: {
    value(val) {
      this.model =  date.formatDate(this.value, this.display)
    }
  },
  methods: {
    onFocus() {
      this.curVal = this.model
    },
    onBlur() {
      if (!date.isValid(this.model)) {
        this.model = this.curVal
      } else {
        this.model = date.formatDate(this.model, this.display)
      }
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
    this.model =  date.formatDate(this.value, this.display)
    this.$emit('input',this.model)
  }
}
</script>

<style>
</style>
