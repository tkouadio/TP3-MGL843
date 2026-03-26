import { Note } from '../domain/Note';
import { INotesRepository } from '../persistence/NotesRepository';

export class NotesPersistenceManager {
  constructor(private readonly repo: INotesRepository) {}

  loadAll(): Note[] {
    return this.repo.getAll();
  }

  saveAll(notes: Note[]): void {
    this.repo.saveAll(notes);
  }

  findById(id: number): Note | undefined {
    return this.loadAll().find(note => note.id === id);
  }

  findByIdOrThrow(id: number): { notes: Note[]; note: Note } {
    const notes = this.loadAll();
    const note = notes.find(item => item.id === id);
    if (!note) throw new Error('NOTE_NOT_FOUND');
    return { notes, note };
  }

  computeNextId(notes: Note[]): number {
    return notes.length > 0 ? Math.max(...notes.map(note => note.id)) + 1 : 1;
  }
}
