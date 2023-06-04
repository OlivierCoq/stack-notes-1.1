import { NoteFile, NoteFileContents } from '../types/Files';
import { promises as fs } from 'fs'


export const fileFunctions = {
    // Returns a NoteFile object from a file path
    async getNotes() : Promise<NoteFile[] | void> {
       try {
        const files = await fs.readdir('./local')

        // read all files at once and return an array of promises
        const notes = files.map(async (file) => {
            const contents = await fs.readFile(`./local/${file}`, 'utf-8')
            const parsedContents = JSON.parse(contents) as NoteFile
            return parsedContents
        })

        // return all promises at once
        return Promise.all(notes)
        
       } catch (error) {
        console.log(error)
       }
    }
}