import { Note } from '../domain/Note';
import { INotesRepository } from '../persistence/NotesRepository';

export class NotesService {
  constructor(private readonly repo: INotesRepository) {}

  list(): Note[] {
    return this.repo.getAll().sort((a, b) => a.id - b.id);
  }

  create(title: string, content: string, tags: string[]): Note {
    const notes = this.repo.getAll();
    const nextId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) + 1 : 1;
    const note = Note.createNew(nextId, title, content, tags);

    notes.push(note);
    this.repo.saveAll(notes);
    return note;
  }

  update(id: number, fields: { title?: string; content?: string }): Note {
    const notes = this.repo.getAll();
    const note = notes.find((n) => n.id === id);

    if (!note) {
      throw new Error('NOTE_NOT_FOUND');
    }

    note.update(fields);
    this.repo.saveAll(notes);
    return note;
  }

  delete(id: number): void {
    const notes = this.repo.getAll();
    const filtered = notes.filter((n) => n.id !== id);

    if (filtered.length === notes.length) {
      throw new Error('NOTE_NOT_FOUND');
    }

    this.repo.saveAll(filtered);
  }
}