<template>
  <div class="main-container">
    <div v-if="!isAuthenticated">
    <div class="text-container">
      <i class="bi bi-cash-coin cash-icon text-white"></i>
      <h1 class="text-center hedding">WELCOME TO BILL BUDDY</h1>
      <h5 class="text-center subtitle">"I'm there to remind your Share"</h5>
    </div>
    <div class="text-center">
      <p class="paragraph text-center mt-5">For more details, please login
        <i class="bi icon bi-arrow-up-right-square-fill ms-2"></i>
      </p>
    </div>
  </div>
  <div v-if="isAuthenticated">
    <div class="text-container">
      <i class="bi bi-cash-coin cash-icon text-white"></i>
      <h1 class="text-center hedding">WELCOME TO BILL BUDDY</h1>
      <h5 class="text-center subtitle">"I'm there to remind your Share"</h5>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
import { reactive } from 'vue'

const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()

</script>

<style scoped>
.main-container {
  background: linear-gradient(90deg, #160024, rgb(78, 1, 114), #1c0129);
  min-height: 94vh; /* Set a minimum height to ensure content is visible on small screens */
  padding: 20px; /* Add some padding to the container */
}

.text-container {
  padding-top: 15%;
  text-align: center;
}

.hedding {
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  color: white;
  font-size: 48px; /* Reduce font size for smaller screens */
  text-shadow: #ffffff;
}
.bi-cash-coin {
  font-size: 52px; /* You can adjust the size as needed */
}
.paragraph {
  font-family: sans-serif;
  color: rgb(255, 255, 255);
  font-size: 16px; /* Reduce font size for smaller screens */
  text-shadow: #ffffff;
  text-align: center;
  text-decoration-line: underline;
}

.subtitle {
  font-family: monospace;
  color: rgb(255, 255, 255);
  font-size: 24px; /* Reduce font size for smaller screens */
  text-shadow: #ffffff;
}

.icon {
  font-size: 24px; /* Reduce icon size for smaller screens */
}

/* Media query for smaller screens (adjust as needed) */
@media (max-width: 768px) {
  .main-container {
    padding: 10px; /* Reduce padding for smaller screens */
  }

  .hedding {
    font-size: 36px; /* Further reduce font size for very small screens */
  }

  .paragraph {
    font-size: 14px; /* Further reduce font size for very small screens */
  }
  .subtitle {
    font-size: 20px; /* Further reduce font size for very small screens */
  }

  .icon {
    font-size: 20px; /* Further reduce icon size for very small screens */
  }
}
</style>
