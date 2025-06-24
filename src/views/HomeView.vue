<template>
  <div class="w-full max-w-xl">
    <div class="flex gap-2 mb-4">
      <input
        v-model="inputValue"
        placeholder="Введите ID альбомов (например: 1 2 3)"
        class="flex-1 border border-zinc-300 dark:border-zinc-600 rounded px-3 py-2 outline-none"
        @keyup.enter="onSearch"
        type="text"
      />
      <button
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
          :disabled="loading"
          @click="onSearch">
        <span v-if="!loading">Поиск</span>
        <span v-else class="animate-pulse">Загрузка...</span>
      </button>
    </div>

    <div v-if="error" class="text-red-500 mb-2">
      {{ error }}
    </div>

    <PhotoTable v-if="!loading" :photos="photos" @sort="onSort" />

  </div>
</template>


<script setup>
import {ref, onMounted} from "vue";
import {usePhotoStore} from "../stores/photoStore.js";
import {storeToRefs} from "pinia";
import PhotoTable from "../components/PhotoTable.vue";

const photoStore = usePhotoStore();
const { photos, isLoading: loading, error, albumIds } = storeToRefs(photoStore)

const inputValue = ref('')
if (Array.isArray(albumIds.value)) {
  inputValue.value = albumIds.value.join(' ')
}


const parseAlbumInput = () => {
  return String(inputValue.value)
      .split(' ')
      .map(id => parseInt(id.trim()))
      .filter(id => !isNaN(id))
}

function onSearch() {
  const ids = parseAlbumInput()
  photoStore.setAlbumIds(ids)
  photoStore.fetchPhotos(ids)
}

function onSort(key) {
  photoStore.setSort(key)
}

onMounted(() => {
  if (!photos.value.length) {
    photoStore.fetchPhotos()
  }
})

</script>