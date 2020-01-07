<template>
  <q-dialog
    v-bind="attrs" v-on="listeners"
    @show="loadElement"
  >
    <q-card :style="`width:${width||'40vw'};max-width:100vw`" class="no-scroll">
      <q-bar :class="barClass || `bg-primary text-white`">
        <div class="text-h6">{{title}}</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section class="q-pa-none">
        <q-scroll-area style="height: 85vh;">
          <div class="q-mx-md q-my-sm">
            <slot/>
          </div>
          <q-inner-loading :showing="loading">
            <q-spinner-ios size="100px" color="primary" />
          </q-inner-loading>
        </q-scroll-area>
      </q-card-section>
      <q-card-actions v-if="scopedSlots.action">
        <slot name="action"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'DialogEx',
  props: {
    barClass: String,
    title: String,
    wait: Number,
    width: Number,
  },
  data() {
    return {
      loading: false
    }
  },
  inheritAttrs: false,
  computed: {
    attrs() {
      return {
        ...this.$attrs,
      }
    },
    listeners() {
      let {...listens} = this.$listeners
      return listens
    },
    scopedSlots() {
      return this.$scopedSlots
    },
  },
  methods: {
    loadElement() {
      if (this.wait) {
        this.loading = true
        console.log(this.wait,'wait',this.loading)
        setTimeout(() => {
          this.loading = false
          console.log(this.wait,'wait',this.loading)
        }, this.wait)
      }
    }
  },
  mounted() {
    
  }
}
</script>

<style>
</style>
