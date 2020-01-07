<template>
  <q-tr :props="props">
    <q-td v-for="col in props.cols" :key="col.name" :props="props" :style="tdStyle">
      <template v-if="col.type === 'selection'">
        <q-checkbox v-model="data[col.name]"/>
      </template>
      <template v-else-if="col.type === 'no'">
        <q-avatar size="20px" class="q-ma-none q-pa-none text-anti-primary" color="primary">{{props.row.__index+startNo}}</q-avatar>
      </template>
      <template v-else-if="col.type === 'delete'">
        <q-btn icon="clear" color="negative" flat dense @click="() => {$emit('modify',{payload:'delete', index:props.row.__index})}"/>
      </template>
      <template v-else-if="col.type === 'boolean'">
        <template v-if="col.form || form">
          <q-avatar v-if="col.value === true || col.value === 1" size="24px" class="text-white" color="positive" icon="check"></q-avatar>
          <q-avatar v-else size="24px" class="text-white" color="negative" icon="close"></q-avatar>
        </template>
        <template v-else>
          <q-toggle checked-icon="check" unchecked-icon="close" :true-value="1" :false-value="0" v-model="data[col.name]" color="primary"/>
        </template>
      </template>
      <template v-else-if="col.type === 'button'">
        <q-btn v-bind="col.attr" @click="col.callback(col,props.row)"/>
      </template>
      <template v-else-if="col.type === 'select' && (col.form || form)">
        <select-filter :placeholder="col.label" :options="col.options" v-model="data[col.name]" v-bind="col.attr"/>
      </template>
      <template v-else-if="col.type === 'date' && (col.form || form)">
        <input-date  :placeholder="col.label" :options="col.options" v-model="data[col.name]" v-bind="col.attr"/>
      </template>
      <template v-else>
        <template v-if="col.form || form">
          <q-input :placeholder="col.label" v-model="data[col.name]" v-bind="col.attr"/>
        </template>
        <template v-else>
          {{col.value}}
        </template>
      </template>
    </q-td>
  </q-tr>
</template>

<script>
export default {
  components: {
    'select-filter' : () => import('./SelectFilter'),
    'input-date' : () => import('./InputDate'),
  },
  name: 'TableBody',
  props: {
    props: [Object,Array],
    columns: Array,
    form: Boolean,
    selection: Boolean,
    startNo: Number,
    tdStyle: String,
  },
  data () {
    return {
      data: {}
    }
  },
  watch: {
    data: {
      handler: function(newData) {
        console.log(this.props.row.__index)
        this.$emit('modify',{payload: newData,index: this.props.row.__index})
      },
      deep: true
    },
    props: {
      handler: function(newData) {
        console.log('props watching u', newData)
        this.refresh()
      },
      // deep: true
    }
  },
  methods: {
    refresh() {
      this.props.cols.map((col) => {
        if (col.type === 'selection')
          this.$set(this.data,col.name,col.value || false)
        else  
          this.$set(this.data,col.name,col.value || '')
      })
    },
    check(col) {
      console.log('col',col)
    }
  },
  mounted() {
    console.log('props',this.props)
    this.refresh()
  }
}
</script>

<style>
</style>
