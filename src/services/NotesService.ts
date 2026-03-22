import { Note } from '../domain/Note';
import { INotesRepository } from '../persistence/NotesRepository';

export class NotesService {
  constructor(private readonly repo: INotesRepository) {}

  list(): Note[] {
    return this.loadNotes().sort((a, b) => a.id - b.id);
  }

  search(keyword: string): Note[] {
    return this.loadNotes().filter(note => note.matches(keyword));
  }

  getById(id: number): Note | undefined {
    return this.loadNotes().find(note => note.id === id);
  }

  create(title: string, content: string, tags: string[]): Note {
    const notes = this.loadNotes();
    const nextId = this.computeNextId(notes);
    const note = Note.createNew(nextId, title, content, tags);
    notes.push(note);
    this.saveNotes(notes);
    return note;
  }

  update(id: number, fields: { title?: string; content?: string }): Note {
    const notes = this.loadNotes();
    const note = this.findNoteOrThrow(id, notes);
    note.update(fields);
    this.saveNotes(notes);
    return note;
  }

  delete(id: number): void {
    const notes = this.loadNotes();
    const filtered = notes.filter(note => note.id !== id);
    if (filtered.length === notes.length) {
      throw new Error('NOTE_NOT_FOUND');
    }
    this.saveNotes(filtered);
  }

  addTag(id: number, tag: string): Note {
    const notes = this.loadNotes();
    const note = this.findNoteOrThrow(id, notes);
    note.addTag(tag);
    this.saveNotes(notes);
    return note;
  }

  removeTag(id: number, tag: string): Note {
    const notes = this.loadNotes();
    const note = this.findNoteOrThrow(id, notes);
    note.removeTag(tag);
    this.saveNotes(notes);
    return note;
  }

  private loadNotes(): Note[] {
    return this.repo.getAll();
  }

  private saveNotes(notes: Note[]): void {
    this.repo.saveAll(notes);
  }

  private findNoteOrThrow(id: number, notes: Note[]): Note {
    const note = notes.find(note => note.id === id);
    if (!note) {
      throw new Error('NOTE_NOT_FOUND');
    }
    return note;
  }

  private computeNextId(notes: Note[]): number {
    return notes.length > 0 ? Math.max(...notes.map(note => note.id)) + 1 : 1;
  }
}