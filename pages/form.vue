<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <form @submit.prevent="submitForm" class="bg-white p-6 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl mb-4">User Information</h2>
      <div class="mb-4">
        <label class="block mb-1">First Name</label>
        <input v-model="firstName" type="text" class="w-full border p-2 rounded" />
        <div v-if="errors.firstName" class="text-red-500">{{ errors.firstName }}</div>
      </div>
      <div class="mb-4">
        <label class="block mb-1">Last Name</label>
        <input v-model="lastName" type="text" class="w-full border p-2 rounded" />
        <div v-if="errors.lastName" class="text-red-500">{{ errors.lastName }}</div>
      </div>
      <div class="mb-4">
        <label class="block mb-1">Age</label>
        <input v-model.number="age" type="number" class="w-full border p-2 rounded" />
        <div v-if="errors.age" class="text-red-500">{{ errors.age }}</div>
      </div>
      <div class="mb-4">
        <label class="block mb-1">Date of Birth</label>
        <input v-model="dob" type="date" class="w-full border p-2 rounded" />
        <div v-if="errors.dob" class="text-red-500">{{ errors.dob }}</div>
      </div>
      <div class="mb-4">
        <label class="block mb-1">Address</label>
        <input v-model="address" type="text" class="w-full border p-2 rounded" />
        <div v-if="errors.address" class="text-red-500">{{ errors.address }}</div>
      </div>
      <button type="submit" class="w-full bg-green-500 text-white p-2 rounded">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as XLSX from 'xlsx'

const firstName = ref('')
const lastName = ref('')
const age = ref<number | null>(null)
const dob = ref('')
const address = ref('')
const errors = ref<Record<string, string>>({})

const validate = () => {
  errors.value = {}
  if (!firstName.value) errors.value.firstName = 'Required'
  if (!lastName.value) errors.value.lastName = 'Required'
  if (!age.value || age.value <= 0) errors.value.age = 'Invalid age'
  if (!dob.value) errors.value.dob = 'Required'
  if (!address.value) errors.value.address = 'Required'
  return Object.keys(errors.value).length === 0
}

const submitForm = () => {
  if (!validate()) return
  const wsData = [
    ['First Name', 'Last Name', 'Age', 'Date of Birth', 'Address'],
    [firstName.value, lastName.value, age.value, dob.value, address.value]
  ]
  const ws = XLSX.utils.aoa_to_sheet(wsData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([wbout], { type: 'application/octet-stream' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'user_data.xlsx'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
</style>
