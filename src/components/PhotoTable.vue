<template>
  <div class="overflow-x-auto border border-zinc-300 rounded">
    <table class="min-w-full text-left text-sm">
      <thead class="bg-zinc-100 text-zinc-700">
      <tr>
        <th
            v-for="column in columns"
            :key="column.key"
            @click="() => emit('sort', column.key)"
            class="cursor-pointer px-4 py-2 hover:bg-zinc-200 transition"
        >
          {{ column.label }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="photo in photos" :key="photo.id" class="border-t hover:bg-zinc-50">
        <td class="px-4 py-2">{{ photo.id }}</td>
        <td class="px-4 py-2">{{ photo.albumId }}</td>
        <td class="px-4 py-2 truncate max-w-[150px]">{{ photo.title }}</td>
        <td class="px-4 py-2 truncate max-w-[150px]">{{ photo.url }}</td>
        <td class="px-4 py-2 truncate max-w-[150px]">{{ photo.thumbnailUrl }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  photos: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['sort'])

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'albumId', label: 'Альбом' },
  { key: 'title', label: 'Название' },
  { key: 'url', label: 'Ссылка' },
  { key: 'thumbnailUrl', label: 'Миниатюра' }
]
</script>
