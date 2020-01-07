import access from './access'

let accessLinks = [] 
access.forEach(v => {
  if (v.children) {
    v.children.forEach(c => {
      accessLinks.push({
        ...c,
        path: `${v.path}/${c.path}`
      })
    })
  } else {
    accessLinks.push(v)
  }
})

const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), meta: {role: true} },
      { path: 'settings', component: () => import('pages/Settings.vue'), meta: {role: true} },
      ...accessLinks,
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/Login.vue')
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
