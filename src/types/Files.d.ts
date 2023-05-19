// Type definitions for Files (Update as needed)

export interface NoteFileContents {
    content: json;
}

export interface NoteFile {
    name: string;
    path: string;
    size: number;
    date: Date;
    tags: string[];
    contents: FileContents[];
}

export interface NoteFolder {
    name: string;
    path: string;
    files: File[];
}