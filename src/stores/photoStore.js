import { defineStore} from "pinia";

export const usePhotoStore = defineStore("photo", {
    state: () => ({
        photos: [],
        isLoading: false,
        error: null,
        albumIds: [],
        sortKey: "id",
        sortOrder: "asc",
    }),
    actions: {
        async fetchPhotos(albumIds = []) {
            try {
                this.isLoading = true;
                this.error = null;

                const query = albumIds.length
                    ? '?' + albumIds.map(id => `albumId=${id}`).join('&')
                    : '';

                const res = await fetch(`https://jsonplaceholder.typicode.com/photos${query}`);
                this.photos = await res.json();
        } catch (e) {
            this.error = e.message || "An error occurred while fetching photos.";
        } finally {
            this.isLoading = false;
        }
    },
        setAlbumIds(ids) {
           this.albumIds = ids;
        },
        setSort(key, asc) {
            this.photos = [...this.photos].sort((a, b) => {
                const valA = a[key]
                const valB = b[key]
                if (valA === valB) return 0
                return (valA > valB ? 1 : -1) * (asc ? 1 : -1)
            })
        }
    },
    getters: {
        sortedPhotos(state) {
            return [...state.photos].sort((a, b) => {
                const dir = state.sortOrder === "asc" ? 1 : -1
                return a[state.sortKey] > b[state.sortKey] ? dir : -dir
            })
        }
    }
});