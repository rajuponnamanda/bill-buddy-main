<template>
  <div class="container mt-4">
    <h1 class="mb-4 text-center">Expense List</h1>
    <nav>
      <div class="nav nav-tabs ms-1" id="nav-tab" role="tablist">
        <button
          class="nav-link active"
          id="nav-home-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-home"
          type="button"
          role="tab"
          aria-controls="nav-home"
          aria-selected="true"
        >
          All
        </button>
        <button
          class="nav-link"
          id="nav-profile-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-profile"
          type="button"
          role="tab"
          aria-controls="nav-profile"
          aria-selected="false"
        >
          Archived
        </button>
      </div>
    </nav>

    <div class="search-bar mb-4 ms-1">
      <input
        type="text"
        class="form-control search-input"
        v-model="searchQuery"
        placeholder="Search by description..."
      />
      <i class="bi bi-search search-icon ms-3"></i>
    </div>

    <div class="tab-content" id="nav-tabContent">
      <div
        class="tab-pane fade show active"
        id="nav-home"
        role="tabpanel"
        aria-labelledby="nav-home-tab"
      >
        <div v-if="loading" class="spinner-container">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div v-else>
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
            <div class="col" v-for="expense in filteredExpenses" :key="expense._id">
              <div class="custom-card mb-4">
                <div class="custom-card-header d-flex justify-content-between">
                  <h5 class="card-title text-truncate">{{ expense.description }}</h5>
                  <i
                    v-if="expense.payerUserId === user?.email"
                    class="bi bi-trash-fill text-white"
                    @click="userDelete(expense._id, 'expenses')"
                    data-toggle="tooltip"
                    title="Delete"
                    data-placement="top"
                  ></i>
                </div>

                <div class="custom-card-body">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                      <div class="me-md-5 pe-md-5 align-items-center">
                        <strong class="ms-4 text-center">Payer</strong>
                        <div>
                          <p class="mt-2 mb-3 col-8 custom-text">
                            <img
                              :src="expense.payerProfilePicture"
                              class="rounded-circle custom-profile-img"
                              alt="Payer's Profile"
                            />
                          </p>
                          <span class="userId ms-1 ps-2 pe-1 text-truncate">{{
                            getPayerUsername(expense.payerUserId)
                          }}</span>
                        </div>
                      </div>

                      <div class="mt-0 mb-3 col-6">
                        <i
                          v-if="expense.payerUserId === user?.email"
                          class="bi icons bi-archive"
                          data-toggle="tooltip"
                          title="Archive"
                          data-placement="top"
                          @click="archiveTransaction(expense._id)"
                        ></i>
                        <router-link :to="{ name: 'view', params: { id: expense._id } }">
                          <i
                            class="bi icons ms-3 me-3 bi-eye text-dark"
                            data-toggle="tooltip"
                            title="View"
                            data-placement="top"
                          ></i>
                        </router-link>
                        <router-link :to="{ name: 'Update', params: { id: expense._id } }">
                          <i
                            class="bi icons bi-pencil-square text-dark"
                            data-toggle
                            title="Edit"
                            data-placement="top"
                          ></i>
                        </router-link>
                      </div>
                    </div>
                  </div>
                  <hr class="custom-hr" />
                  <div class="d-flex justify-content-between mb-2 my-card">
                    <h6 class="mb-0 mt-1 custom-text">
                      <strong>Amount:</strong>
                      <span class="ps-1 pe-1 ms-2 text-white bg-amount rounded-pill">
                        ${{ expense.amount.toFixed(2) }}
                      </span>
                    </h6>
                    <div class="mb-0 custom-text d-flex">
                      <strong>Date:</strong>
                      <div class="d-flex align-items-center">
                        <span class="ps-1 pe-1 ms-2 text-white date-background rounded-pill">
                          {{ formatDate(expense.date) }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="text-center d-flex justify-content-between mb-2">
                    <strong class="custom-text">Participants</strong>
                  </div>
                  <div class="d-flex">
                    <div v-for="participant in expense.participants" :key="participant.userId">
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="align-items-center">
                          <img
                            :src="participant.profilePicture"
                            class="rounded-circle me-2 custom-profile-img"
                            alt="Participant's Profile"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
        <div v-if="loading" class="spinner-container">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div v-else>
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
            <div class="col" v-for="expense in Archivedexpenses" :key="expense._id">
              <div class="mt-2">
                <div class="custom-card shadow-lg mb-4">
                  <div class="custom-card-header d-flex justify-content-between">
                    <h5 class="card-title text-truncate">{{ expense.description }}</h5>
                    <i
                      v-if="expense.payerUserId === user?.email"
                      class="bi bi-trash-fill text-white"
                      @click="userDelete(expense._id, 'Archivedexpenses')"
                    ></i>
                  </div>
                  <div class="custom-card-body">
                    <div class="mb-3 mt-2 text-center">
                      <div class="col-12 mb-2">
                        <strong class="text-center">Payer</strong>
                      </div>
                      <span class="userId ps-1 pe-1 text-truncate">{{ expense.payerUserId }}</span>
                      <div class="mt-3 mb-3 col-12 d-flex justify-content-between">
                        <router-link :to="{ name: 'view', params: { id: expense._id } }">
                          <i
                            class="bi icons ms-3 me-3 bi-eye text-dark"
                            data-toggle="tooltip"
                            title="View"
                            data-placement="top"
                          ></i>
                        </router-link>
                        <router-link :to="{ name: 'Update', params: { id: expense._id } }">
                          <i
                            class="bi icons bi-pencil-square text-dark"
                            data-toggle="tooltip"
                            title="Edit"
                            data-placement="top"
                          ></i>
                        </router-link>
                      </div>
                    </div>
                    <hr class="custom-hr" />
                    <div class="d-flex justify-content-between mb-2 my-card">
                      <h6 class="mb-0 mt-1 custom-text">
                        <strong>Amount:</strong>
                        <span class="ps-1 pe-1 ms-2 text-white bg-amount rounded-pill">
                          ${{ expense.amount.toFixed(2) }}
                        </span>
                      </h6>
                      <div class="mb-0 custom-text d-flex">
                        <strong>Date:</strong>
                        <div class="d-flex align-items-center">
                          <span class="ps-1 pe-1 ms-2 text-white date-background rounded-pill">
                            {{ formatDate(expense.date) }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="text-center d-flex justify-content-between mb-2">
                      <strong class="custom-text">Participants</strong>
                    </div>
                    <div class="align-items-center archive-participants text-dark">
                      <div v-for="participant in expense.participants" :key="participant.userId">
                        <div class="text-center">
                          {{ participant.userId }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axiosInstance from '../services/service'
import { useAuth0 } from '@auth0/auth0-vue'

const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()

interface UserDetails {
  profilePicture: string | undefined
  email: string | undefined
}
let userDetails = ref<UserDetails | null>(null)

export interface Transaction {
  _id: string
  payerUserId: string
  description: string
  amount: number
  date: Date | string
  isArchived: boolean
  payerProfilePicture: string
  participants?: Participant[]
}
type Participant = {
  userId: string
  share: number
  profilePicture: string
}
const loading = ref(true)

const expenses = ref<Transaction[]>([])
const Archivedexpenses = ref<Transaction[]>([])

const isArchived = (expense: { isArchived: boolean }) => {
  return computed(() => expense.isArchived === true)
}

const getPayerUsername = (userId: string) => {
  const nameMatch = userId.match(/[A-Za-z\s]+/)
  if (nameMatch && nameMatch.length > 0) {
    const extractedName = nameMatch[0]

    const camelCaseName = extractedName
      .split(' ')
      .map((word, index) => {
        if (index === 0) {
          return word.toLowerCase()
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
      .join('')

    return camelCaseName
  }
  return userId
}

const fetchData = async () => {
  loading.value = false
  try {
    const response = await axiosInstance.get('/users/transactions')
    expenses.value = response.data
    // console.log(response.data)
  } catch (error) {
    console.error('Error fetching transaction data:', error)
  }
}

const fetchArchivedTransactions = async () => {
  loading.value = false
  try {
    const response = await axiosInstance.get('/archived-transactions')
    Archivedexpenses.value = response.data
    // console.log(response.data)
  } catch (error) {
    console.error('Error fetching transaction data:', error)
  }
}

const archiveTransaction = async (id: any) => {
  try {
    const response = await axiosInstance.post(`/transactions/${id}/archive`)
    expenses.value = response.data
    fetchData()
    // console.log(response.data)
  } catch (error) {
    console.error('Error fetching transaction data:', error)
  }
}

// Function to format a date
const formatDate = (date: string | Date) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString(undefined, options)
}

const userDelete = async (id: any, arrayName: string) => {
  try {
    const response = await axiosInstance.delete(`/transactions/${id}`)
    // console.log(response.data)
    alert('Are you sure to delete')
    if (arrayName === 'expenses') {
      expenses.value = expenses.value.filter((expense) => expense._id !== id)
    } else if (arrayName === 'Archivedexpenses') {
      Archivedexpenses.value = Archivedexpenses.value.filter((expense) => expense._id !== id)
    }
  } catch (error) {
    console.error('Error deleting transaction:', error)
  }
}

const searchQuery = ref('')

const filteredExpenses = computed(() => {
  return expenses.value.filter((expense) => {
    return expense.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})

const fetchUserData = async () => {
  userDetails.value = { profilePicture: user.value?.picture, email: user.value?.email }
  if (user.value) {
    try {
      // console.log(userDetails.value)
      const response = await axiosInstance.post('/createOrGetUser', userDetails.value)
      userDetails.value = response.data
      // console.log(userDetails.value)
      fetchData()
      fetchArchivedTransactions()
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }
}

onMounted(() => {
  fetchUserData()
})
</script>

<style scoped>
.custom-card {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.custom-card:hover {
  transform: translateY(5px) scale(1.02);
}
.userId {
  background-color: #a4beee;
  border-radius: 5px;
  padding-bottom: 2px;
}

.icons {
  font-size: 20px;
  background-color: #c8c8c9;
  border-radius: 2px;
  padding-left: 5px;
  padding-right: 5px;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 5px;
  font-size: 16px;
  background-color: transparent;
}

.search-icon {
  font-size: 24px;
  color: #bebebe;
  margin-right: 10px;
  cursor: pointer;
}

.search-icon:hover {
  color: #333;
  transform: scale(1.1);
  transition:
    color 0.2s,
    transform 0.2s;
}
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
}

.wrong {
  cursor: pointer;
}
.bg-amount {
  background: #00910c65;
  color: black !important;
}
.my-card {
  background: linear-gradient(90deg, hwb(0 100% 0%), hsl(0, 0%, 100%));
  padding: 5px;
  margin-top: 2px;
  border-radius: 5px;
}
.archive-participants {
  background: linear-gradient(90deg, #160024, rgb(78, 1, 114), #1c0129);

  color: white !important;
  padding: 10px;
  border-radius: 10px;
}
.custom-card-header {
  background: linear-gradient(90deg, #160024, rgb(78, 1, 114), #1c0129);

  color: white;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.date-background {
  background: #dfc3f0;
  color: black !important;
  padding-bottom: 1px;
  text-align: center;
  justify-content: center;
  align-items: center;
  /* height: 50%; */
}

.custom-card-body {
  padding: 20px;
}

.custom-card-footer {
  background-color: #f8f9fa;
  padding: 10px 20px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.custom-profile-img {
  width: 40px;
  height: 40px;
}

.custom-text {
  font-size: 16px;
  text-align: center;
}

.custom-hr {
  border-top: 1px solid #e0e0e0;
}

.custom-list-item {
  padding: 10px 20px;
}

.custom-badge {
  font-size: 14px;
  padding: 6px 12px;
}
</style>
