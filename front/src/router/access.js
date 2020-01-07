const access = [

  // { path: 'home', icon: 'home', component: () => import('pages/Index.vue'), meta: {role: true} },

  // { path: 'pengiriman', icon: 'local_shipping', children: [

  //   { path: 'losing', icon: 'local_shipping', label: 'Input Losing', component: () => import('pages/kirim/Losing.vue'),  meta: {role: ['super','letterman']} },
  //   { path: 'lansir', icon: 'local_shipping', label: 'Input Lansir', component: () => import('pages/kirim/Lansir.vue'),  meta: {role: ['super','letterman']} },
  //   { path: 'exgd', icon: 'local_shipping', label: 'Input EXGD', component: () => import('pages/kirim/Exgd.vue'),  meta: {role: ['super','letterman']} },

  // ], meta: {role: ['super','letterman']}, foldif : ['super'] },

  // { path: 'tally-sheet', label: 'Input Bongkar Muat', icon: 'add', children: [

  //   { path: 'regtally', icon: 'directions_boat', label: 'Registrasi', component: () => import('pages/RegTally.vue'),  meta: {role: ['admin','super']} },
  //   { path: 'modtally', icon: 'directions_boat', label: 'Ubah/Hapus', component: () => import('pages/ModTally.vue'),  meta: {role: ['super']} },
  //   { path: 'intally', icon: 'list_alt', label: 'Edit Tally Sheet', component: () => import('pages/InTally.vue'),  meta: {role: ['admin','super']} },
  //   { path: 'acttally', icon: 'local_shipping', label: 'Input Daily Report', component: () => import('pages/ActTally.vue'),  meta: {role: ['admin','super']} },
  //   // { path: 'gudang', icon: 'list_alt', label: 'Data Gudang', component: () => import('pages/Gudang.vue'),  meta: {role: ['admin','super']} },
  //   { path: 'donetally', icon: 'list_alt', label: 'Rampungkan', component: () => import('pages/DoneTally.vue'),  meta: {role: ['admin','super']} },

  // ], meta: {role: ['admin','super']}, foldif : ['admin','super'] },

  // { path: 'preview', label: 'Preview Bongkar Muat', icon: 'list_alt', children: [

  //   { path: 'prevtally', name: 'prev-tally', icon: 'list_alt', label: 'Preview Tally Sheet', component: () => import('pages/PrevTally.vue'),  meta: {role: ['admin','super','manager','letterman']}, 
  //     props: (route) => ({
  //       ...route.params
  //     })
  //   },
  //   { path: 'prevrealisasi', name: 'prev-realisasi', icon: 'list_alt', label: 'Preview Realisasi', component: () => import('pages/PrevRealisasi.vue'),  meta: {role: ['admin','super','manager','letterman']},
  //     props: (route) => ({
  //       ...route.params
  //     })
  //   },

  // ], meta: {role: ['admin','super']}, foldif : ['admin','super'] },

  // { path: 'report', label: 'Report', icon: 'import_contacts', children: [

  //   { path: 'berita-expalka', icon: 'import_contacts', label: 'Bongkar Ex-Palka', component: () => import('pages/report/BAExPalka.vue'),  meta: {role: ['admin','super','manager']} },
  //   { path: 'berita-rampung', icon: 'import_contacts', label: 'Bongkar Rampung', component: () => import('pages/report/BARampung.vue'),  meta: {role: ['admin','super','manager']} },
  //   { path: 'daily-report', icon: 'import_contacts', label: 'Daily Working Report', component: () => import('pages/report/Daily.vue'),  meta: {role: ['admin','super','manager']} },
  //   { path: 'hasil-bongkar', icon: 'import_contacts', label: 'Hasil Bongkar', component: () => import('pages/report/HasilBongkar.vue'),  meta: {role: ['admin','super','manager']} },
  //   { path: 'laporan-gudang', icon: 'import_contacts', label: 'Laporan Gudang', component: () => import('pages/report/Gudang.vue'),  meta: {role: ['admin','super','manager']} },
  //   { path: 'rincian-bongkar', icon: 'import_contacts', label: 'Rincian Bongkar', component: () => import('pages/report/RincianBongkar.vue'),  meta: {role: ['admin','super','manager']} },
  //   { path: 'rincian-kirim', icon: 'import_contacts', label: 'Rincian Kurang Kirim', component: () => import('pages/report/RincianKurangKirim.vue'),  meta: {role: ['admin','super','manager']} },
  //   { path: 'realisasi-pengiriman', icon: 'import_contacts', label: 'Realisasi Pengiriman', component: () => import('pages/report/RealisasiKirim.vue'),  meta: {role: ['admin','super','manager']} },
  //   { path: 'tally-sheet', icon: 'import_contacts', label: 'Tally Sheet', component: () => import('pages/report/TallySheet.vue'),  meta: {role: ['admin','super','manager']} },
  //   { path: 'time-sheet', icon: 'import_contacts', label: 'Time Sheet', component: () => import('pages/report/TimeSheet.vue'),  meta: {role: ['admin','super','manager']} },

  // ], meta: {role: ['admin','super','manager']}, foldif : ['admin','super'] },

  // { path: 'master', label: 'Data Master', icon: 'storage', children: [

  //   { path: 'barang', component: () => import('pages/master/Barang.vue'),  meta: {role: ['admin','super']} },
  //   { path: 'kapal', component: () => import('pages/master/Kapal.vue'),  meta: {role: ['admin','super']} },
  //   { path: 'pemilik', component: () => import('pages/master/Pemilik.vue'),  meta: {role: ['admin','super']} },
  //   { path: 'toko', component: () => import('pages/master/Toko.vue'),  meta: {role: ['admin','super']} },
  //   { path: 'main', label: 'Main Config', component: () => import('pages/MainSettings.vue'),  meta: {role: ['admin','super']} },
  //   { path: 'staf', component: () => import('pages/master/Staff.vue'),  meta: {role: ['super']} },

  // ], meta: {role: ['admin','super']}, foldif : ['admin','super'] },

];

export default access