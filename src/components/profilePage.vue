<template>
  <div class="container mt-4 col-12">
    <h1 class="mb-4 text-center">Profile</h1>
    <div class="row justify-content-center">
      <div class="col-12 col-md-6 col-lg-4">
        <div class="profile-card text-center">
          <div class="profile-image">
            <img
              :src="user?.picture"
              :alt="'Profile Picture'"
              class="img-fluid rounded-circle profile-picture"
            />
          </div>
          <h1 class="card-title">{{ user?.name }}</h1>
          <h5 class="card-text">{{ user?.email }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

const { user, isAuthenticated } = useAuth0();
</script>

<style scoped>
.profile-card {
  max-width: 100%;
  padding: 20px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(90deg, #160024, rgb(78, 1, 114), #1c0129);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  color: #fff;
  transition: transform 0.2s;
  animation: fade-in 1s ease;
}


.profile-card:hover {
  transform: scale(1.02);
  animation: bounce 0.5s ease infinite;
}



.profile-image {
  background-color: #fff;
  border-radius: 50%;
  padding: 10px;
  margin: 0 auto 20px;
  display: inline-block;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  animation: spin 3s linear infinite;
}



.profile-picture {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
