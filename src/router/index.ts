import { createRouter, createWebHistory } from 'vue-router'
import homeVue from '../components/home.vue'
import Mysplits from '../components/Mysplits.vue'
import Addsplit from '../components/AddSplits.vue'
import profilePageVue from '@/components/profilePage.vue'
import { useAuth0 } from '@auth0/auth0-vue'
import view from '../components/view.vue'
import Update from '../components/Update.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: homeVue
    },
    {
      path: '/Mysplits',
      component: Mysplits
    },
    {
      path: '/Addsplit',
      component: Addsplit
    },
    {
      path: '/profilePAge',
      component: profilePageVue
    },

    {
      path: '/view/:id',
      name: 'view',
      component: view
    },
    {
      path: '/Update/:id',
      component: Update,
      name: 'Update',
      props: true
    }
  ]
})
router.beforeEach(async (to, from, next) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0()

  if (to.path !== '/' && !isAuthenticated) {
    await loginWithRedirect()
  } else {
    next()
  }
})
export default router
