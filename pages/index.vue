<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <form @submit.prevent="login" class="bg-white p-6 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl mb-4">Login</h2>
      <div class="mb-4">
        <label class="block mb-1">Username</label>
        <input v-model="username" type="text" class="w-full border p-2 rounded" />
      </div>
      <div class="mb-4">
        <label class="block mb-1">Password</label>
        <input v-model="password" type="password" class="w-full border p-2 rounded" />
      </div>
      <div v-if="error" class="mb-4 text-red-500">{{ error }}</div>
      <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = () => {
  if (username.value === 'admin_test' && password.value === 'Test@eiei555') {
    router.push('/form')
  } else {
    error.value = 'Invalid credentials'
  }
}
</script>

<style scoped>
</style>
