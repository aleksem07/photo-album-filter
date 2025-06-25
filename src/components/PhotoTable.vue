<template>
  <div
      class="border border-zinc-300 rounded max-h-[600px] overflow-y-auto"
      @scroll="handleScroll"
      ref="tableContainer"
  >
    <table class="w-full text-left text-sm table-fixed">
      <thead class="bg-zinc-100 text-zinc-700 sticky top-0 z-10">
      <tr>
        <th
            v-for="column in columns"
            :key="column.key"
            @click="() => emit('sort', column.key)"
            class="cursor-pointer px-4 py-2 hover:bg-zinc-200 transition truncate whitespace-nowrap"
            :style="{ width: column.width }"
        >
          {{ column.label }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="photo in visiblePhotos"
          :key="photo.id"
          class="border-t hover:bg-zinc-50"
      >
        <td class="px-4 py-2 truncate whitespace-nowrap overflow-hidden">
          {{ photo.id }}
        </td>
        <td class="px-4 py-2 truncate whitespace-nowrap overflow-hidden">
          {{ photo.albumId }}
        </td>
        <td class="px-4 py-2 truncate whitespace-nowrap overflow-hidden]" :title="photo.title">
          {{ photo.title }}
        </td>
        <td class="px-4 py-2 truncate whitespace-nowrap overflow-hidden" :title="photo.url">
          <a
              :href="photo.url"
              target="_blank"
              class="hover:underline"
          >
            {{ photo.url }}
          </a>
        </td>
        <td class="px-4 py-2 truncate whitespace-nowrap overflow-hidden" :title="photo.thumbnailUrl">
          {{ photo.thumbnailUrl }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'

const props = defineProps({
  photos: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['sort'])

const columns = [
  { key: 'id', label: 'ID', width: '10%' },
  { key: 'albumId', label: 'Альбом', width: '10%' },
  { key: 'title', label: 'Название', width: '25%' },
  { key: 'url', label: 'Ссылка', width: '25%' },
  { key: 'thumbnailUrl', label: 'Миниатюра', width: '30%' }
]

const LIMIT = 30
const visibleCount = ref(LIMIT)
const tableContainer = ref(null)

const visiblePhotos = computed(() => props.photos.slice(0, visibleCount.value))

function handleScroll() {
  const el = tableContainer.value
  if (!el) return

  const { scrollTop, scrollHeight, clientHeight } = el
  if (scrollTop + clientHeight >= scrollHeight - 20) {
    if (visibleCount.value < props.photos.length) {
      visibleCount.value += LIMIT
    }
  }
}

watch(
    () => props.photos,
    () => {
      visibleCount.value = LIMIT
    },
    { deep: true }
)

onMounted(() => {
  visibleCount.value = LIMIT
})
</script>
