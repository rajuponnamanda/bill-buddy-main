<template>
  <div class="container mt-4 col-lg-8 col-xl-12 col-md-8">
    <div class="row ">
      <div class="">
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                src="https://media.istockphoto.com/id/1420323134/photo/divorce-legal-dispute-resolution-and-mediation.jpg?b=1&s=612x612&w=0&k=20&c=rCueYa1boUcDifJT_mK_fg3TlF3QzBTFZQuaaz9mKsQ="
                class="w-100"
              />
              <div class="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>Some representative placeholder content for the first slide</p>
              </div>
            </div>
            <div class="carousel-item">
              <img
                src="https://d3.harvard.edu/platform-digit/wp-content/uploads/sites/2/2018/03/splitwise-640x265-640x200.png"
                class="d-block w-100"
                alt="..."
              />
              <div class="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>Some representative placeholder content for the second slide.</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src="https://d3.harvard.edu/platform-digit/wp-content/uploads/sites/2/2018/03/splitwise-640x265-640x200.png" class="d-block w-100" alt="..." />
              <div class="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>Some representative placeholder content for the third slide.</p>
              </div>
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div class="col-lg-8 col-xl-12 col-md-8 ">
        <div class="card-container mt-4 d-flex">
          <div v-for="card in cards" :key="card.id" class="card border-0 mb-4 ">
            <!-- You can add your card content here -->
            <h3 class="card-title text-center">{{ card.title }}</h3>
            <p class="card-description text-center mb-5">{{ card.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const cards = reactive([
  // Define your card data here
  {
    id: 1,
    title: 'Card 1',
    description: 'Description for Card 1'
  },
  {
    id: 2,
    title: 'Card 2',
    description: 'Description for Card 2'
  },
  {
    id: 3,
    title: 'Card 3',
    description: 'Description for Card 3'
  }
])
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.card-title {
  font-size: 18px;
}

.card-description {
  font-size: 14px;
}

.carousel {
  max-width: 100%;
}

/* Ensure responsiveness for xxl screen size */
@media (min-width: 1400px) {
  .container {
    max-width: 1400px;
  }
}
</style>
