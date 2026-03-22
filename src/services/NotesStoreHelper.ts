import { Note } from '../domain/Note';
import { INotesRepository } from '../persistence/NotesRepository';

export class NotesStoreHelper {
  constructor(private readonly repo: INotesRepository) {}

  loadAll(): Note[] {
    return this.repo.getAll();
  }

  saveAll(notes: Note[]): void {
    this.repo.saveAll(notes);
  }

  findById(id: number, notes: Note[]): Note | undefined {
    return notes.find(note => note.id === id);
  }

  findByIdOrThrow(id: number, notes: Note[]): Note {
    const note = this.findById(id, notes);
    if (!note) {
      throw new Error('NOTE_NOT_FOUND');
    }
    return note;
  }

  computeNextId(notes: Note[]): number {
    return notes.length > 0 ? Math.max(...notes.map(note => note.id)) + 1 : 1;
  }
}