<template>
  <div
      class="min-h-screen flex flex-col items-center justify-start p-4"
      :class="isDark ? 'text-zinc-100 bg-zinc-900' : 'text-zinc-900 bg-zinc-100'"
  >
    <div class="w-full max-w-[600px] flex items-center justify-between mb-4">
      <h1 class="text-2xl font-semibold">
        Фото альбомы
      </h1>
      <ThemeToggle :isDark="isDark" @toggle="toggleTheme" />
    </div>

    <HomeView :isDark="isDark" class="w-full max-w-[600px]" />
  </div>
</template>


<script setup>
import {ref, onMounted} from 'vue'
import HomeView from './views/HomeView.vue'
import ThemeToggle from './components/ThemeToggle.vue'

const isDark = ref(false)

onMounted(() => {
  isDark.value = localStorage.getItem('theme') === 'dark'
  document.documentElement.classList.toggle('dark', isDark.value)
})

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}
</script>
