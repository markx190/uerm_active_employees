
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/active_employees', component: () => import('pages/ActiveEmployees.vue') },
      // { path: '/active_employees/profile/:id', component: () => import('components/EmployeeProfile.vue') },
      { path: '/employee_details', component: () => import('components/EmployeeDetails.vue') }
    ]
  },

  { path: '/active_employees/profile/:id', component: () => import('components/EmployeeProfile.vue') },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
