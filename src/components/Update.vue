<template>
  <div class="container mt-4">
    <h1 class="mb-4 text-center">Edit Expense</h1>
    <div class="row">
      <div class="col-md-8 mx-auto">
        <div class="custom-card mb-4">
          <div class="custom-card-header d-flex justify-content-between">
            <h5 class="card-title">Expense Details</h5>
            <router-link to="/Mysplits" class="border-0 rounded-pill text-dark">
              <i class="bi bi-arrow-left-circle-fill"></i>
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
                  <option v-for="email in suggestedEmails" :key="email" :value="email">{{ email }}</option>
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
            <div v-for="(participant, index) in expense.participants" :key="index">
              <div class="mb-3 d-flex justify-content-between align-items-center">
                <label :for="`participantName${index}`" class="form-label me-2">Name:</label>
                <div class="input-group">
                  <select
                    :id="`participantName${index}`"
                    class="form-select"
                    v-model="participant.userId"
                  >
                    <option value="" disabled>Select a payer</option>
                    <option v-for="email in suggestedEmails" :key="email" :value="email">{{ email }}</option>
                  </select>
                </div>
                <label :for="`participantShare${index}`" class="form-label ms-4 me-2">Share:</label>
                <div class="input-group">
                  <input
                    :id="`participantShare${index}`"
                    class="form-control"
                    v-model="participant.share"
                  />
                  <button @click="removeParticipant(index)" class="cancel-icon">
                    <i class="bi bi-x text-danger"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-center mt-4">
              <button class="btn btn-secondary me-3 ps-4 pe-4 rounded-pill" @click="updateExpense"
                :disabled="!isFormValid"
              >
                <i class="bi bi-pencil-fill"></i> Update Expense
              </button>
              <button class="btn btn-danger ps-4 pe-4 rounded-pill" @click="cancelExpense">
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
  background: linear-gradient(90deg, #040e18, #9bafe6);
  color: white;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.cancel-icon {
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: red;
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
</style>
