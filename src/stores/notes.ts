import { defineStore } from 'pinia'

export interface NoteFileContents {
  content: JSON;
}

const api = (window as any).api;


// Notes type. Taken from src/types/Files.d.ts
interface Note {
  name: string;
  path: string;
  size: number;
  date: Date;
  tags: string[];
  contents: NoteFileContents[];
}

export const useNotesStore = defineStore('notes', {
  state: () => ({ 
    notes: [] as Note[],
    openNotes: [] as Note[],
    activeNote: {} as Note
  }),
  getters: {
  },
  actions: {
    openNote(note: Note) :void {
      this.activeNote = note
      // push into openNotes
    },
    // getNotes() {
    //   const local_notes = window.api.invoke('get-notes')
    // },
    // async getNotes() {
    //   try {
    //     window.api.receive('get-notes-reply', (response) => {
    //       if (response.success) {
    //         this.notes = response.notes
    //         return this.notes
    //       } else {
    //         return response.error
    //       }
    //     })
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
  }
})

// if(import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useNotesStore, import.meta.hot))
// }