<template>
  <nav class="navbar bg-nav navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand heading  h-color">Split Wise</router-link>

      <button
        class="navbar-toggler bg-primary"
        type="button" 
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              to="/Mysplits"
              v-if="isAuthenticated"
              class="nav-link  h-color"
              aria-current="page"
              aria-selected="false"
            >
              My Splits
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/Addsplit"
              v-if="isAuthenticated"
              class="nav-link  h-color"
              aria-selected="true"
            >
              Add Split
            </router-link>
          </li>
        </ul>
      </div>

      <button
        v-if="!isAuthenticated"
        class="btn btn-primary custom-button"
        data-toggle="tooltip"
        title="Log In"
        data-placement="top"
        @click="login"
      >
        <i class="bi bi-box-arrow-in-right  h-color"></i> Log In
      </button>

      <div
        v-if="isAuthenticated"
        class="dropdown d-flex"
        data-toggle="tooltip"
        title="More Details"
        data-placement="top"
      >
        <img
          :src="user?.picture"
          alt="profilePicture"
          style="height: 25px; width: 25px"
          class="img-fluid rounded-circle cursor-pointer"
          data-bs-toggle="dropdown"
        />

        <ul class="dropdown-menu mr-16 dropdown-menu-end">
          <li>
            <router-link to="/profilePage" class="dropdown-item">Profile</router-link>
          </li>
          <li>
            <button class="btn btn-transperent" @click="handleLogout">Sign Out</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
import { ref, onMounted, computed } from 'vue'
import router from '../router'
import axiosInstance from '../services/service'

const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()

const Welcome = 'Welcome'
interface UserDetails {
  profilePicture: string | undefined
  email: string | undefined
}

const userDetails = ref<UserDetails>({
  profilePicture: user.value?.picture,
  email: user.value?.email
})
const isActive = (route: any) => {
  return computed(() => {
    return route.path === route
  })
}
const login = () => {
  loginWithRedirect()
  router.push("/Mysplits")
}
const fetchData = async () => {
  try {
    const response = await axiosInstance.get('/users/transactions')
    // expenses.value = response.data
    // console.log(response.data)
  } catch (error) {
    console.error('Error fetching transaction data:', error)
  }
}

onMounted(() => {
  if (isAuthenticated.value) {
    fetchData()
  }
})

const handleLogout = () => {
  logout({ logoutParams: { returnTo: window.location.origin } })
}
</script>

<style scoped lang="scss">
//  .navbar {
//   background: linear-gradient(90deg, #160024, rgb(78, 1, 114), #230033);
// } 


.custom-button {
  background-color: transparent;
  color: rgb(253, 253, 253);
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  transition: background-color 0.3s;
  font-weight: bolder;
}
.heading {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 24px;
  
}
</style>
