import { defineStore } from 'pinia'

// const fetchNotes = () => {
//     window.api.receive('get-notes-reply', (response) => {
//       if (response.success) {
//         return response.notes
//       } else {
//        return response.error
//       }
//     });
//   }

export const useNotesStore = defineStore('notes', {
  state: () => ({ notes: [] }),
  getters: {
  },
  actions: {
    async getNotes() {
      try {
        window.api.receive('get-notes-reply', (response) => {
          if (response.success) {
            this.notes = response.notes
            return this.notes
          } else {
            return response.error
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
  }
})