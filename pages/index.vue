<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
      <h2 class="text-center text-2xl font-bold">Login</h2>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            class="mt-1 block w-full border border-gray-300 rounded p-2"
            placeholder="admin_test"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="mt-1 block w-full border border-gray-300 rounded p-2"
            placeholder="Test@eiei555"
          />
        </div>
        <div v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const errorMessage = ref('')

const onSubmit = () => {
  // ตรวจสอบว่าตรงกับ admin_test / Test@eiei555 หรือไม่
  if (username.value === 'admin_test' && password.value === 'Test@eiei555') {
    errorMessage.value = ''
    // ถ้า login ถูก ให้นำทางไปหน้า /form
    router.push('/form')
  } else {
    errorMessage.value = 'Username หรือ Password ไม่ถูกต้อง'
  }
}
</script>
