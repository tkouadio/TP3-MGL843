import { Note } from '../domain/Note';
import { INotesRepository } from '../persistence/NotesRepository';

export class TagService {
  constructor(private readonly repo: INotesRepository) {}

  addTag(id: number, tag: string): Note {
    const notes = this.repo.getAll();
    const note = notes.find((n) => n.id === id);

    if (!note) {
      throw new Error('NOTE_NOT_FOUND');
    }

    note.addTag(tag);
    this.repo.saveAll(notes);
    return note;
  }

  removeTag(id: number, tag: string): Note {
    const notes = this.repo.getAll();
    const note = notes.find((n) => n.id === id);

    if (!note) {
      throw new Error('NOTE_NOT_FOUND');
    }

    note.removeTag(tag);
    this.repo.saveAll(notes);
    return note;
  }
}