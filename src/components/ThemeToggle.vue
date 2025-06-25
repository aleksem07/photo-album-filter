<template>
  <button
      @click="$emit('toggle')"
      class="px-4 py-2 rounded border text-sm"
      :class="isDark ? 'bg-zinc-800 text-white border-zinc-700' : 'bg-white text-zinc-900 border-zinc-300'"
  >
    {{ isDark ? 'Темная тема' : 'Светлая тема' }}
  </button>
</template>

<script setup>
const props = defineProps({
  isDark: Boolean
})
</script>
