import { Note } from '../domain/Note';
import { NotesPersistenceManager } from './NotesPersistenceManager';

export class NotesCommandService {
  constructor(private readonly persistence: NotesPersistenceManager) {}

  create(title: string, content: string, tags: string[]): Note {
    const notes = this.persistence.loadAll();
    const nextId = this.persistence.computeNextId(notes);
    const note = Note.createNew(nextId, title, content, tags);
    notes.push(note);
    this.persistence.saveAll(notes);
    return note;
  }

  update(id: number, fields: { title?: string; content?: string }): Note {
    const { notes, note } = this.persistence.findByIdOrThrow(id);
    note.update(fields);
    this.persistence.saveAll(notes);
    return note;
  }

  delete(id: number): void {
    const notes = this.persistence.loadAll();
    const filtered = notes.filter(note => note.id !== id);
    if (filtered.length === notes.length) throw new Error('NOTE_NOT_FOUND');
    this.persistence.saveAll(filtered);
  }

  addTag(id: number, tag: string): Note {
    const { notes, note } = this.persistence.findByIdOrThrow(id);
    note.addTag(tag);
    this.persistence.saveAll(notes);
    return note;
  }

  removeTag(id: number, tag: string): Note {
    const { notes, note } = this.persistence.findByIdOrThrow(id);
    note.removeTag(tag);
    this.persistence.saveAll(notes);
    return note;
  }
}
