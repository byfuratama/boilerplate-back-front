<template>
  <q-page padding>
    <span class="text-h4">Pengaturan Akun</span>
    <q-separator class="q-mt-sm q-mb-lg"/>
    <form @submit.prevent="updateInfo" class="column q-col-gutter-md q-px-xl">
      <q-input outlined v-model="username" :maxlength="10" label="Username"/>
      <q-input outlined v-model="nama" :maxlength="15" label="Nama"/>
      <input-date outlined v-model="tanggal" display="DD/MMMM/YYYY" label="Tanggal Lahir"/>
      <q-input outlined v-model="telepon" :maxlength="16" label="Telepon"/>
      <div class="row justify-end">
        <q-btn type="submit" label="Update Akun" color="positive"/>
      </div>
    </form>
    <q-separator class="q-my-lg"/>
    <form @submit.prevent="updatePassword" class="column q-col-gutter-md q-px-xl">
      <span class="text-h5">Ganti Password</span>
      <q-input outlined v-model="oldPassword" type="password" label="Password Lama"/>
      <q-input outlined v-model="password" type="password" label="Password Baru"/>
      <div class="row justify-end">
        <q-btn type="submit" label="Update Password" color="positive"/>
      </div>
    </form>
    <q-inner-loading :showing="loading"/>
  </q-page>
</template>

<script>
export default {
  name: 'Settings',
  components: {
    'input-date' : () => import('../components/plugins/InputDate')
  },
  data() {
    return {
      username: '',
      nama: '',
      tanggal: '',
      telepon: '',
      oldPassword: '',
      password: '',
      printout: {}
    }
  },
  computed: {
    loading: {
      get() {
        return this.$store.state.loading 
      }
    },
    // printout() {
    //   return this.$store.getters.getPrintout
    // }
  },
  methods: {
    loadInfo() {
      this.$store.dispatch("store",`/auth/me`)
        .then((response) => {
          let data = response
          this.username = data.username
          this.nama = data.name
          this.tanggal = data.birthdate
          this.telepon = data.phone
        }).catch((error) => {
          console.log(error)
          this.$notifyNegative("Gagal Mengambil Informasi")
        })
    },
    updatePassword() {
      let inputs = {
        oldPassword: this.oldPassword,
        password: this.password
      }
      this.$store.dispatch("store",{url: `/auth/update-password`, inputs})
        .then((response) => {
          let data = response.data
          this.$notifyPositive("Berhasil Mengupdate Password")
          this.oldPassword = ''
          this.password = ''
        }).catch((error) => {
          console.log(error)
          this.$notifyNegative("Gagal Mengupdate Password")
        })
    },
    updateInfo() {
      let inputs = {
        username: this.username,
        name: this.nama,
        birthdate: this.tanggal,
        phone: this.telepon
      }
      this.$store.dispatch("store",{url: `/auth/update-info`, inputs})
        .then((response) => {
          let data = response.data
          this.$store.commit("rename",{name: data.name})
          this.$notifyPositive("Berhasil Mengupdate Informasi")
        }).catch((error) => {
          console.log(error)
          this.$notifyNegative("Gagal Mengupdate Informasi")
        })
    },
    updatePrintout() {
      // this.$notifyPositive("Berhasil Mengupdate Printout")
      // this.$store.commit('setPrintoutSettings', {
      //   margin : {
      //     left: this.printout.margin.left,
      //     top: this.printout.margin.top,
      //   },
      //   font : {
      //     one: this.printout.font.one,
      //     two: this.printout.font.two,
      //     three: this.printout.font.three,
      //   },
      //   width: this.printout.width,
      //   rows: this.printout.rows,
      //   store: {
      //     name: this.printout.store.name,
      //     address: this.printout.store.address,
      //     phone: this.printout.store.phone,
      //     email: this.printout.store.email,
      //   }, 
      //   styles: this.printout.styles,
      //   notabene: this.printout.notabene,
      // })
    }
  },
  created() {
    this.loadInfo()
    // this.printout = {
    //   margin : {
    //     left: this.$store.state.printout.margin.left,
    //     top: this.$store.state.printout.margin.top,
    //   },
    //   font : {
    //     one: this.$store.state.printout.font.one,
    //     two: this.$store.state.printout.font.two,
    //     three: this.$store.state.printout.font.three,
    //   },
    //   width: this.$store.state.printout.width,
    //   rows: this.$store.state.printout.rows,
    //   store: {
    //     name: this.$store.state.printout.store.name,
    //     address: this.$store.state.printout.store.address,
    //     phone: this.$store.state.printout.store.phone,
    //     email: this.$store.state.printout.store.email,
    //   },
    //   styles: this.$store.state.printout.styles,
    //   notabene: this.$store.state.printout.notabene,
    // }
  },
}
</script>

<style>
</style>
