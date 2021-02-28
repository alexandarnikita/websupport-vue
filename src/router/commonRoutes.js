
export default [
  {
    path: '/',
    redirect: '/hello'
  },
  {
    path: '/hello',
    meta: {
      title: 'Hello',
      ignoreAuth: true
    },
    component: () => import('../views/hello/index.vue')
  }
]

