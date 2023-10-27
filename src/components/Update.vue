<template>
  <div class="container mt-4">
    <h1 class="mb-4 text-center">Edit Expense</h1>
    <div class="row">
      <div class="col-md-8 mx-auto">
        <div class="custom-card mb-4">
          <div class="custom-card-header d-flex justify-content-between">
            <h5 class="card-title">Expense Details</h5>
            <router-link to="/Mysplits" class="border-0 rounded-pill text-dark">
              <i class="bi bi-arrow-left-circle-fill text-white"></i>
            </router-link>
          </div>
          <div class="custom-card-body" v-if="expense">
            <form>
              <div class="mb-3">
                <label for="expenseDescription" class="form-label">Description</label>
                <input
                  type="text"
                  id="expenseDescription"
                  class="form-control"
                  v-model="expense.description"
                />
              </div>
              <div class="mb-3">
                <label for="payerUserId" class="form-label">Payer</label>
                <select id="payerUserId" class="form-select" v-model="expense.payerUserId">
                  <option value="" disabled>Select a payer</option>
                  <option v-for="email in suggestedEmails" :key="email" :value="email">
                    {{ email }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="expenseAmount" class="form-label">Amount</label>
                <input
                  type="number"
                  id="expenseAmount"
                  class="form-control"
                  v-model="expense.amount"
                />
              </div>
              <div class="mb-3">
                <label for="expenseDate" class="form-label">Date</label>
                <input
                  type="date"
                  id="expenseDate"
                  class="form-control"
                  :value="formattedDate"
                  @input="updateDate"
                />
              </div>
            </form>
          </div>
        </div>
        <div class="custom-card mb-4" v-if="expense">
          <div class="custom-card-header d-flex justify-content-between">
            <h5 class="card-title">Participants</h5>
            <button class="add-button border-0 bg-dark rounded-pill" @click="addParticipant">
              <i class="bi bi-person-fill-add"></i>
            </button>
          </div>
          <div class="custom-card-body">
            <div class="custom-card-body">
              <table class="table table-dark table-borderless">
                <thead class="table table-dark table-borderless">
                  <tr>
                    <th>Name</th>
                    <th>Share</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(participant, index) in expense.participants" :key="index">
                    <td>
                      <div class="input-group">
                        <select class="form-select custom-select" v-model="participant.userId">
                          <option value="" disabled>Select a payer</option>
                          <option v-for="email in suggestedEmails" :key="email" :value="email">
                            {{ email }}
                          </option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div class="input-group">
                        <input class="form-control custom-input" v-model="participant.share" />
                      </div>
                    </td>
                    <td>
                      <button @click="removeParticipant(index)" class="btn btn-danger custom-btn">
                        <i class="bi bi-x"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="d-flex justify-content-center mt-4">
              <button class="btn btn-secondary me-3 ps-4 pe-4 rounded-pill" @click="updateExpense">
                <i class="bi bi-pencil-fill"></i> Update Expense
              </button>
              <button class="cancle-icon ps-4 pe-4 rounded-pill" @click="cancelExpense">
                <i class="bi bi-x-square-fill"></i> Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-grid gap-2 col-2 mx-auto"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axiosInstance from '../services/service'
import type { GetTransactionData } from '../models/model'

const expense = ref<GetTransactionData | null>(null)
const suggestedEmails = ref<string[]>([])

const router = useRouter()
const route = useRoute()
const formattedDate = ref<string>('')

const fetchData = async () => {
  try {
    const transactionId = route.params.id
    const response = await axiosInstance.get(`/transaction/${transactionId}`)
    expense.value = response.data

    if (expense.value) {
      formattedDate.value = new Date(expense.value.date).toISOString().split('T')[0]
    }
  } catch (error) {
    console.error('Error fetching transaction data:', error)
  }
}
const cancelExpense = () => {
  if (expense.value) {
    expense.value.description = ''
    expense.value.amount = 0
    expense.value.payerUserId = ''
    expense.value.isArchived = false
    expense.value.date = ''
    expense.value.participants = [
      {
        userId: '',
        share: 0,
        profilePicture: ''
      }
    ]
    formattedDate.value = ''
  }
}

const addParticipant = () => {
  if (expense.value?.participants) {
    expense.value.participants.push({
      userId: '',
      share: 0,
      profilePicture: ''
    })
  }
}

const removeParticipant = (index: number) => {
  if (expense.value?.participants) {
    expense.value.participants.splice(index, 1)
  }
}

const updateDate = (event: Event) => {
  if (expense.value) {
    expense.value.date = (event.target as HTMLInputElement).value
  }

  formattedDate.value = (event.target as HTMLInputElement).value
}

const updateExpense = async () => {
  if (expense.value) {
    try {
      const transactionId = route.params.id
      const postData = expense.value
      const response = await axiosInstance.put(`/editTransaction/${transactionId}`, postData)
      console.log('Expense updated successfully:', response)
      router.push('/Mysplits')
    } catch (error) {
      console.error('Error updating expense:', error)
    }
  }
}

const getSuggestedEmails = async () => {
  try {
    const response = await axiosInstance.get('/getSuggestedEmails')
    suggestedEmails.value = response.data
  } catch (error) {
    console.error('Error fetching suggested emails:', error)
  }
}

onMounted(() => {
  fetchData()
  getSuggestedEmails()
})
</script>

<style scoped>
.custom-card {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.custom-card-header {
  background: linear-gradient(90deg, #160024, rgb(78, 1, 114), #1c0129);

  color: white;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.cancel-icon {
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: rgb(174, 0, 255);
}
.cancle-icon {
  background-color: rgb(87, 1, 99);
  border: 1px solid #ccc;
  border-radius: 5px;
  color: rgb(250, 250, 250);
}

.add-button {
  background-color: #9bafe6;
  color: rgb(255, 255, 255);
}

.custom-card-body {
  padding: 20px;
}

.form-label {
  font-weight: bold;
}

.custom-card-body .mb-3 {
  margin-bottom: 1.5rem;
}

.text-danger {
  color: red;
}

.custom-select {
  background-color: #dddddd; /* Light gray background */
  font-weight: bold;
}

.custom-input {
  background-color: #dddddd; /* Slightly darker gray background */
}

.custom-btn {
  background-color: #e40303; /* Red background */
  color: rgb(255, 255, 255);
  border: none;
  /* padding: 8px 12px; */
  transition: background-color 0.3s;
}

.custom-btn:hover {
  background-color: #c82333; /* Darker red on hover */
}
</style>
