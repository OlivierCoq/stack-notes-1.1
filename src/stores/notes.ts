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
  }
})

// if(import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useNotesStore, import.meta.hot))
// }