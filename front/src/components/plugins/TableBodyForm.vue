<template>
  <q-tr :props="props">
    <q-td v-if="hasNo">
      <q-avatar size="18px" class="text-white" color="primary">{{props.row.__index+1}}</q-avatar>
    </q-td>
    <q-td key="noSPB" :props="props">
      <q-input class="full-width" dense :value="props.row.noSPB" placeholder="No SPB"/>
    </q-td>
    <q-td key="noSPM" :props="props">
      <q-input class="full-width" dense :value="props.row.noSPM" placeholder="No SPM"/>
    </q-td>
    <q-td key="noDO" :props="props">
      <q-input class="full-width" dense :value="props.row.noDO" placeholder="No DO"/>
    </q-td>
    <q-td key="noPolisi" :props="props">
      <q-input class="full-width" dense :value="props.row.noPolisi" placeholder="No Polisi"/>
    </q-td>
    <q-td key="badanTruck" :props="props">
      <q-input class="full-width" dense :value="props.row.badanTruck" placeholder="Badan"/>
    </q-td>
    <q-td key="tujuan" :props="props">
      <q-input class="full-width" dense :value="props.row.tujuan" placeholder="Tujuan"/>
    </q-td>
    <q-td key="muatan" :props="props">
      <q-input class="full-width" dense :value="props.row.muatan" placeholder="Muatan"/>
    </q-td>
    <q-td key="penerima" :props="props">
      <q-select class="full-width" :options="['Gudang']" dense :value="props.row.penerima" placeholder="Penerima"/>
    </q-td>
  </q-tr>
</template>

<script>
export default {
  name: 'TableBodyForm',
  props: {
    props: [Object,Array],
    columns: Array,
    hasNo: Boolean,
    canDelete: Boolean,
    form: Boolean,
  },
  data () {
    return {

    }
  },
}
</script>

<style>
</style>
