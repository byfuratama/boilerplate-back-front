<template>
  <div>
    <div class="column" v-for="(v,k) in jsonVal">
      <div class="flex justify-end">
        <q-input dense outlined placeholder="Key" @focus="onFocus(k)" @blur="onBlurKey" :value="k"/>
        <q-input dense outlined style="width:500px" @focus="onFocus(k)" @blur="onBlurValue" placeholder="Value" :value="v"/>
      </div>
    </div>
    <!-- <div class="column justify-end">
      <div class="row justify-end">
        <q-btn dense icon="add" @click="newEle"/>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: {
    value: String
  },
  watch: {
    value(val) {
      this.jsonVal = JSON.parse(val)
    }
  },
  data() {
    return {
      jsonVal: JSON.parse(this.value),
      oldInp: ''
    }
  },
  methods: {
    input() {
      this.$emit('input',JSON.stringify(this.jsonVal))
    },
    onBlurKey(ev) {
      let inp = ev.target.value
      if (inp !== this.oldInp) {
        this.jsonVal[inp] = this.jsonVal[this.oldInp]
        delete this.jsonVal[this.oldInp]
        this.input()
      }
    },
    onBlurValue(ev) {
      let inp = ev.target.value
      this.jsonVal[this.oldInp] = inp
      this.input()
    },
    onFocus(ev) {
      this.oldInp = ev//ev.target.value
    },
    newEle() {
      this.jsonVal
    }
  },
}
</script>

<style>
</style>
