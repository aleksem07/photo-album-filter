<template>
  <div class="w-full max-w-[600px]">
    <div class="flex gap-2 mb-4">
      <input
        v-model="inputValue"
        placeholder="Введите ID альбомов (например: 1 2 3)"
        class="flex-1 border border-zinc-300 dark:border-zinc-600 rounded px-3 py-2 outline-none"
        @keyup.enter="onSearch"
        type="text"
      />
      <button
          class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white disabled:opacity-50"
          :disabled="loading"
          @click="onSearch"
      >
  <span v-if="!loading" class="flex items-center gap-2 text-base">
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
    <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
    </svg>
    Поиск
  </span>
        <span v-else class="text-base animate-pulse">Загрузка...</span>
      </button>

    </div>

    <div v-if="error" class="text-red-500 mb-2">
      {{ error }}
    </div>

    <PhotoTable :isDark="isDark"  v-if="!loading" :photos="photos" @sort="onSort" />

  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { usePhotoStore } from '../stores/photoStore.js'
import { storeToRefs } from 'pinia'
import PhotoTable from '../components/PhotoTable.vue'

const photoStore = usePhotoStore()
const { photos, isLoading: loading, error, albumIds } = storeToRefs(photoStore)

const props = defineProps({
  isDark: Boolean
})

const inputValue = ref('')
const sortKey = ref(null)
const sortAsc = ref(true)

if (Array.isArray(albumIds.value)) {
  inputValue.value = albumIds.value.join(' ')
}

const parseAlbumInput = () =>
    String(inputValue.value)
        .split(' ')
        .map(id => parseInt(id.trim()))
        .filter(id => !isNaN(id))

function onSearch() {
  const ids = parseAlbumInput()
  photoStore.setAlbumIds(ids)
  photoStore.fetchPhotos(ids)
}

function onSort(key) {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value
  } else {
    sortKey.value = key
    sortAsc.value = true
  }
  photoStore.setSort(key, sortAsc.value)
}

onMounted(() => {
  if (!photos.value.length) {
    photoStore.fetchPhotos()
  }
})
</script>
