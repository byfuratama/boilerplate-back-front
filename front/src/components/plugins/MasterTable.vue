<template>
  <div>
    <x-table
      :title="title"
      :data="data"
      :columns="cols"
      row-key="id"
      :pagination.sync="pagination"
      :loading="loading"
      :filter="filter"
      @request="onRequest"
      binary-state-sort
      :rows-per-page-options="rpp"
      class="bg-secondary text-anti-primary"
      table-class="bg-accent text-black"
      :hide-header="!loading"
    >
      <template v-slot:top-right>
        <div class="row q-col-gutter-md">
          <slot name="header"></slot>
          <q-input dark outlined dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>
      <template v-slot:top-row="props">
        <q-tr v-show="!loading" :props="props">
          <q-td v-for="(col,index) in cols" :key="index">
            <template v-if="col.type == 'string'">
              <q-input debounce="900" v-model="col.filter" style="height:12px" input-style="padding:0px;font-size:12px" dense :placeholder="`${col.label}`"/>
            </template>
            <template v-else-if="col.type == 'integer' || col.type == 'decimal'">
              <q-input debounce="900" v-model="col.filter" style="height:12px" input-style="padding:0px;font-size:12px" dense :placeholder="`${col.label}`"/>
            </template>
            <template v-else-if="col.type == 'enum'">
              <q-select clearable dense v-model="col.filter" :options="col.options" map-options style="height:12px;min-width:50px;font-size:12px" input-style="padding:0px;font-size:12px" :label="`${col.label}`" />
            </template>
            <template v-else-if="col.type == 'boolean'">
              <q-toggle checked-icon="check" unchecked-icon="clear" :true-value="1" :false-value="0" v-model="col.filter" color="primary" dense style="margin-left:-15px"/>
            </template>
          </q-td>
        </q-tr>
      </template>
      <template v-slot:body-cell="props">
        <q-td :props="props">
          <template v-if="props.col.type == 'boolean'">
            <q-avatar v-if="props.value" size="24px" class="text-white" color="positive" icon="check"></q-avatar>
            <q-avatar v-else size="24px" class="text-white" color="negative" icon="close"></q-avatar>
          </template>
          <template v-else-if="props.col.type == 'action'">
            <q-btn icon="edit" color="warning" flat dense @click="onEdit(props.row)"/>
            <q-btn icon="delete" color="negative" flat dense>
              <q-popup-proxy :breakpoint="600">
                <q-banner inline-actions class="bg-negative text-white">
                  Yakin?
                  <template v-slot:action>
                    <q-btn flat label="Ya" v-close-popup @click="onDelete(props.row)"/>
                  </template>
                </q-banner>
              </q-popup-proxy>
            </q-btn>
          </template>
          <template v-else>
            {{props.value}}
          </template>
        </q-td>
      </template>
      
    </x-table>

    <q-btn dense class="q-px-sm top-btn" rounded icon="add" :label="addLabel || `data`" color="positive" @click="onNew()" />

    <!--  -->    
    
    <q-dialog v-model="formDialog" persistent>
      <q-card style="min-width:40vw">
        <q-bar class="bg-primary text-white">
          <div class="text-h6">{{editID === null ? 'Tambah' : 'Ubah'}} {{title}}</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-scroll-area style="height: 87vh;">
          <form @submit.prevent="onSubmit">
          <q-card-section>
            <div v-for="(input,index) in inps" :key="index">
              <template v-if="input.type == 'text' || !input.type">
                <q-input :label="input.label" v-model="input.value" v-bind="input.attr" />
              </template>
              <template v-else-if="input.type == 'textarea'">
                <q-input autogrow :label="input.label" v-model="input.value"  v-bind="input.attr" />
              </template>
              <template v-else-if="input.type == 'password'">
                <q-input type="password" :label="input.label" v-model="input.value"  v-bind="input.attr" />
              </template>
              <template v-else-if="input.type == 'number'">
                <q-input type="number" :label="input.label" v-model.number="input.value"  v-bind="input.attr" />
              </template>
              <template v-else-if="input.type == 'toggle'">
                <q-toggle class="q-my-sm" checked-icon="check" unchecked-icon="clear" :true-value="1" :false-value="0" v-model="input.value" color="primary" :label="input.label"  v-bind="input.attr"/>
              </template>
              <template v-else-if="input.type == 'date'">
                <q-input :label="input.label" v-model="input.value" mask="####/##/##" placeholder="YYYY/MM/DD"  v-bind="input.attr">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy>
                        <q-date v-model="input.value" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </template>
              <template v-else-if="input.type == 'select'">
                <q-select v-model="input.value" :options="input.options" map-options :label="input.label"  v-bind="input.attr">
                </q-select>
              </template>
              <template v-else-if="input.type == 'resource'">
                <q-select v-model="input.value" :options="input.options" map-options :label="input.label"  v-bind="input.attr">
                  <template v-if="input.resource.component" v-slot:after>
                    <q-btn round dense flat icon="add" @click="showResource(input,index)" />
                  </template>
                </q-select>
              </template>
            </div>
          </q-card-section>
          <q-card-actions>
            <div class="row justify-end q-my-xs full-width">
              <q-btn type="submit" :loading="loading" :label="!editID ? 'Tambah Data' : 'Ubah Data'" color="positive"/>
            </div>
          </q-card-actions>
          </form>
        </q-scroll-area>
      </q-card>
    </q-dialog>

    <!--  -->

    <q-dialog v-model="resourceDialog" @hide="refreshResource">
      <q-card style="min-width:75vw">
        <q-bar class="bg-primary text-white">
          <div class="text-h6">{{resource.title}}</div>

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        
        <q-card-section class="q-pa-none q-ma-none">
          <div class="scroll q-pa-md" style="height:85vh">
            <component :is="resource.component"></component>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!--  -->

    <q-dialog v-model="componentDialog">
      <q-card style="width:80vw;max-width:100vw">
        <q-bar class="bg-primary text-white">
          <div class="text-h6">{{component.title}}</div>

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        
        <q-card-section class="q-pa-none q-ma-none">
          <q-scroll-area style="height:85vh" class="q-px-md">
            <component class="q-pa-md" :data="component.data" :is="component.component"></component>
          </q-scroll-area>
        </q-card-section>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import TableEx from './TableEx'

const upperCase = (str) => str.toUpperCase()

export default {
  name: 'MasterTable',
  components: {
    'x-table' : () => import('./TableEx')
  },
  props: {
    title: String,
    columns: Array,
    visibleColumns: Array,
    resourceURL: String,
    inputs: Array,
    addLabel: String
  },
  data () {
    return {
      filter: '',
      rpp: [5,7,9,15,50],
      pagination: {
        page: 1,
        rowsPerPage: 9,
        rowsNumber: 10,
      },
      data: [],
      cols: [],
      inps: [],
      nomor: 1,
      editID: null,
      formDialog: false,
      defInps: [],
      resourceDialog: false,
      resource: {},
      componentDialog: false,
      component: {},
      singleFilter: {}
    }
  },
  computed: {
    loading: {
      get() { 
        return this.$store.state.loading 
      },
      set(value) {
        if (value) { 
          this.$store.commit("loadingStart") 
        } else { 
          this.$store.commit("loadingEnd") 
        }
      }
    },
    colFilters() {
      return this.cols
    }
  },
  watch: {
    colFilters: {
      handler(val){
        this.rerequest()
      },
      deep: true
    },
    inputs: {
      handler(val){
        this.setInputs()
      },
      deep: true
    },
  },
  methods: {
    onRequest (props) {
      let { page, rowsPerPage, rowsNumber, sortBy, descending } = props.pagination
      let filter = props.filter
      let colFilter = {} 
      let cols = props.cols || this.cols
      cols.forEach((el) => {
        if (el.type && el.type != 'dialog')
          colFilter[el.name] = el.filter
      })

      this.$store.dispatch("fetchPaginate",{url: this.resourceURL, pagination: props.pagination, params: {filter, colFilter}})
        .then((data) => {
          let tabledata = data.data
          this.data = tabledata.data
          this.nomor = tabledata.from
          this.pagination.page = tabledata.current_page
          this.pagination.rowsPerPage = tabledata.per_page
          this.pagination.rowsNumber = tabledata.total          
        }).catch((error) => {
          this.$notifyNegative('Ada Sebuah Kesalahan')
        })
    },
    rerequest() {
      this.onRequest({
        pagination: this.pagination,
        filter: this.filter,
        cols: this.cols
      })
    },
    onDelete(row) {
      this.$store.dispatch("destroySingle",{url: this.resourceURL, id: row.id})
      .then((data) => {
        this.$notifyPositive('Data Berhasil Dihapus')
      }).catch((error) => {
        this.$notifyNegative('Ada Sebuah Kesalahan')
      }).finally(() => {
        this.rerequest()
      })
    },
    onEdit(row) {
      this.editID = row.id
      this.$store.dispatch("fetchSingle",{url: this.resourceURL, id: row.id}).then((data) => {
        this.inps = this.inps.map((input) => {
          return {
            ...input,
            value: data.data[input.name]
          }
        })
        this.formDialog = true
      }).catch((error) => {
        this.$notifyNegative('Ada Sebuah Kesalahan')
      })
    },
    onNew() {
      this.editID = null
      this.resetForm()
      this.formDialog = true
    },
    onSubmit() {
      let inputs = {}
      this.inps.forEach((input) => {
        if (input.value != null && input.value != undefined) {
          inputs[input.name] = input.value
          if (input.value.value && input.type == 'resource' || input.type == 'select')
            inputs[input.name] = input.value.value
        }
      })
      let afterSubmit = () => {
        this.resetForm()
        this.formDialog = false
        setTimeout(() => {
          this.rerequest()
        }, 200)
      }
      if (this.editID) {
        this.$store.dispatch("updateSingle",{url: this.resourceURL, id: this.editID, inputs})
        .then((data) => {
          this.$notifyPositive('Data Berhasil Diubah')
        }).catch((error) => {
          this.$notifyNegative('Ada Sebuah Kesalahan')
        }).finally(afterSubmit())
      } else {
        this.$store.dispatch("store",{url: this.resourceURL, inputs})
        .then((data) => {
          this.$notifyPositive('Data Berhasil Dimasukkan')
        }).catch((error) => {
          this.$notifyNegative('Ada Sebuah Kesalahan')
        }).finally(afterSubmit())
      }
    },
    showResource(input,index) {
      this.resource = {
        title: input.label,
        component: input.resource.component,
        index: index
      }
      this.resourceDialog = true
    },
    showComponent(col,row) {
      this.component = {
        title: col.label,
        component: col.component,
        data: row
      }
      console.log(this.component)
      this.componentDialog = true
    },
    fillResource(resource,index) {
      this.$store.dispatch("fetch",{url: resource.url})
        .then((response) => {
          let data = response.data
          let options = data.map((v) => {
            return {
              label: v[resource.label],
              value: v.id
            }
          })
          this.$set(this.defInps[index], "options", options);
          this.$set(this.inps[index], "options", options);
        }).catch((error) => {
        })
    },
    refreshResource() {
      let input = this.defInps[this.resource.index]
      this.fillResource(input.resource,this.resource.index)
    },
    resetForm() {
      this.inps = this.defInps.map((input) => {
        return {
          ...input,
          value: input.default
        }
      })
    },
    setInputs() {
      this.defInps = this.inputs.map((input,index) => {
        if (input.type == 'resource') {
          this.fillResource(input.resource,index)
        }
        return {
          ...input,
          options: input.options ? input.options.map((v) => {return {...v,label: upperCase(v.label)}}) : null,
          label: input.label ? input.label : input.name.toUpperCase(),
          value: input.default ? input.default : null
        }
      })
    }
  },
  created() {
    this.cols = this.columns.map((col) => {
      return {
        ...col,
        filter: col.filter || (col.type == 'boolean' ? 1 : ''),
      }
    })
    this.cols = [{type: 'no'}, ...this.cols, {type: 'action'}]
    
  },
  mounted () {    
    // this.rerequest()
    this.setInputs()
    this.resetForm()
  },
}
</script>

<style lang="stylus">
.text-grey-8 .material-icons
  color: white !important

.top-btn
  position: absolute
  top: 2px
  left: 40%
</style>
