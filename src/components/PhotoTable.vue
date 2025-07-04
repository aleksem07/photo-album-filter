<template>
  <div
      class="border border-zinc-300 rounded max-h-[600px] max-w-[600px] overflow-y-auto"
      @scroll="handleScroll"
      ref="tableContainer"
  >
    <template v-if="visiblePhotos.length">
      <table class="w-full text-left text-sm table-fixed">
        <thead class="bg-zinc-100 sticky top-0 z-10"
               :class="isDark ? 'bg-zinc-100 text-zinc-700' : 'bg-zinc-900 text-white'">
        <tr>
          <th
              v-for="column in columns"
              :key="column.key"
              @click="() => emit('sort', column.key)"
              class="cursor-pointer px-2 py-2 text-center hover:bg-blue-600 hover:text-white transition whitespace-nowrap"
              :style="{ width: column.width }"
          >
            <div class="flex items-center justify-center gap-1">
              <span>{{ column.label }}</span>

              <span v-if="props.sortKey === column.key">
      <svg
          v-if="props.sortAsc"
          xmlns="http://www.w3.org/2000/svg"
          class="w-3 h-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
      </svg>
      <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="w-3 h-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </span>
            </div>
          </th>

        </tr>
        </thead>
        <tbody>
        <tr
            v-for="photo in visiblePhotos"
            :key="photo.id"
            class="border-t hover:bg-blue-600 hover:text-white transition "
        >
          <td class="px-4 py-2 whitespace-nowrap">
            {{ photo.id }}
          </td>
          <td class="px-4 py-2  whitespace-nowrap">
            {{ photo.albumId }}
          </td>
          <td class="px-4 py-2 truncate whitespace-nowrap" :title="photo.title">
            {{ photo.title }}
          </td>
          <td class="px-4 py-2 truncate whitespace-nowrap" :title="photo.url">
            <a
                :href="photo.url"
                target="_blank"
                class="hover:underline"
            >
              {{ photo.url }}
            </a>
          </td>
          <td class="px-4 py-2 truncate whitespace-nowrap" :title="photo.thumbnailUrl">
            <a
                :href="photo.thumbnailUrl"
                target="_blank"
                class="hover:underline"
            >
            {{ photo.thumbnailUrl }}
            </a>
          </td>
        </tr>
        </tbody>
      </table>
    </template>

    <p v-else class="p-4 text-center text-zinc-500">Альбомы не найдены</p>

  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'

const props = defineProps({
  photos: {
    type: Array,
    required: true
  },
    isDark: Boolean,
    sortKey: String,
    sortAsc: Boolean
})

const emit = defineEmits(['sort'])

const columns = [
  { key: 'id', label: 'ID', width: '10%' },
  { key: 'albumId', label: 'Альбом', width: '15%' },
  { key: 'title', label: 'Название', width: '25%' },
  { key: 'url', label: 'Ссылка', width: '25%' },
  { key: 'thumbnailUrl', label: 'Миниатюра', width: '25%' }
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
