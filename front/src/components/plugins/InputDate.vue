<template>
  <q-input v-bind="$attrs" :value="$date.formatDate(model,display)" @focus="doPopup" ref="input">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="popup" @hide="doBlur">
          <q-date v-bind="$attrs" v-model="model"/>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  name: "InputDate",
  props: {
    value: String,
    display: {
      type: String,
      default: 'YYYY/MM/DD'
    }
  },
  data () {
    return {
      model: this.value,
    }
  },
  watch: {
    model(val) {
      this.$emit('input',val)
    },
    value(val) {
      this.model = val
    }
  },
  methods: {
    doPopup() {
      this.$refs['popup'].show()
    },
    doBlur() {
      this.$refs['input'].blur()
    }
  },
  mounted() {
    console.log('date',this.$attrs)
  }
}
</script>

<style>
</style>
