import { defineStore } from 'pinia'

export interface NoteFileContents {
  editor_content: string;
  content: string;
  code: boolean;
}

// Notes type. Taken from src/types/Files.d.ts
interface Note {
  name: string;
  path: string;
  size: number;
  date: Date;
  tags: string[];
  contents: NoteFileContents[];
  id: string;
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
      if(this.openNotes.find(item => note.id === item.id)) return
      this.openNotes.push(note)
    },
    updateContent(content: string, contentIndex: number) : void {
      console.log(content)
      this.activeNote.contents[contentIndex].content = content
    }
  }
})

// if(import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useNotesStore, import.meta.hot))
// }