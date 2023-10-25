<template>
  <div class="container mt-4">
    <h1 class="mb-4 text-center">Add Expense</h1>
    <div class="row">
      <!-- <div class="col-3"></div> -->
      <div class="col-md-12 add-card">
        <div class="custom-card mb-4">
          <div class="custom-card-header d-flex justify-content-between">
            <h5 class="card-title">Expense Details</h5>
            <router-link to="/Mysplits" class="border-0 rounded-pill text-dark"
              ><i class="bi bi-arrow-left-circle-fill"></i
            ></router-link>
          </div>
          <div class="custom-card-body">
            <div class="mb-3">
              <label for="expenseDescription" class="form-label">Description</label>
              <input
                type="text"
                id="expenseDescription"
                class="form-control"
                v-model="formData.description"
              />
            </div>
            <div class="mb-3">
              <label for="payerUserId" class="form-label">Payer</label>
              <select id="payerUserId" class="form-select" v-model="formData.payerUserId">
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
                v-model="formData.amount"
              />
            </div>
            <div class="mb-3">
              <label for="expenseDate" class="form-label">Date</label>
              <input type="date" id="expenseDate" class="form-control" v-model="formData.date" />
            </div>
          </div>
        </div>
        <div class="custom-card mb-4">
          <div class="custom-card-header d-flex justify-content-between">
            <h5 class="card-title">Participants</h5>
            <button class="add-button border-0 bg-dark rounded-pill" @click="addParticipant">
              <i class="bi bi-person-fill-add"></i>
            </button>
          </div>
          <div class="custom-card-body">
            <div v-for="(participant, index) in formData.participants" :key="index">
              <div class="mb-3 d-flex justify-content-between align-items-center">
                <label :for="`participantName${index}`" class="form-label me-2">Name:</label>
                <div class="input-group">
                  <select id="payerUserId" class="form-select" v-model="participant.userId">
                    <option value="" disabled>Select a payer</option>
                    <option v-for="email in suggestedEmails" :key="email" :value="email">
                      {{ email }}
                    </option>
                  </select>
                </div>
                <label :for="`participantName${index}`" class="form-label ms-4 me-2">Share:</label>
                <div class="input-group">
                  <input
                    :id="`participantName${index}`"
                    class="form-control"
                    v-model="participant.share"
                  />
                  <button @click="removeParticipant(index)" class="cancel-icon">
                    <i class="bi bi-x text-danger"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-4 mx-auto d-flex justify-content-center">
              <!-- Conditionally render the "Save Expense" button -->
              <button
                class="btn btn-secondary text-dark me-3 ps-4 pe-4 rounded-pill"
                @click="saveExpense"
                v-if="formData.description && formData.payerUserId && formData.amount > 0"
              >
                <i class="bi bi-floppy-fill"></i>
                Save 
              </button>
              <button
                class="btn btn-danger text-dark ps-4 pe-4 rounded-pill"
                @click="cancelExpense"
              >
                <i class="bi bi-x-square-fill"></i>
                Cancel 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-grid gap-2 col-2 mx-auto"></div>
  </div>
</template>



<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axiosInstance from '../services/service'
import router from '../router'

const formData = ref({
  payerUserId: '',
  description: '',
  amount: 0,
  date: '',
  isArchived: false,
  participants: [
    {
      userId: '',
      share: 0
    }
  ],
  __v: 0,
  payerProfilePicture: ''
})
type Participant = {
  userId: string
  share: number
}

const suggestedEmails = ref([])
const selectedEmail = ref('You')
const selectedPeopleToAdd = ref([])
const selectedPeople = ref<Participant[]>([])

const getSuggestedEmails = async () => {
  try {
    const response = await axiosInstance.get('/getSuggestedEmails')
    suggestedEmails.value = response.data
  } catch (error) {
    console.error('Error fetching suggested emails:', error)
  }
}


const cancelExpense = () => {
  // Clear the form data
  formData.value.description = '';
  formData.value.amount = 0;
  formData.value.payerUserId = '';
  formData.value.isArchived = false;
  formData.value.date = '';
  formData.value.participants = [
    {
      userId: '',
      share: 0,
    },
  ];
  selectedPeople.value = [];
};

const addSelectedPeople = () => {
  selectedPeople.value = [...selectedPeople.value, ...selectedPeopleToAdd.value]
  selectedPeopleToAdd.value = []
}

const addParticipant = () => {
  formData.value.participants.push({
    userId: '',
    share: 0
  })
}

const removeParticipant = (index: number) => {
  formData.value.participants.splice(index, 1)
}

const saveExpense = async () => {
  console.log('hfdhfhf', formData)

  try {
    const postData = {
      description: formData.value.description,
      amount: formData.value.amount,
      payerUserId: formData.value.payerUserId,
      participants: formData.value.participants,
      isArchived: formData.value.isArchived,
      date: formData.value.date
    }
    const response = await axiosInstance.post('/addTransaction', postData)

    console.log('Response:', response.data)

    formData.value.description = ''
    formData.value.amount = 0
    selectedEmail.value = ''
    formData.value.isArchived = false
    selectedPeople.value = []
    formData.value.date = ''
  } catch (error) {
    console.error('Error:', error)
  }
  router.push('/Mysplits')
}

onMounted(() => {
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

.custom-card-body .btn-primary {
  margin-top: 1rem;
}

.text-danger {
  color: red;
}
</style>
