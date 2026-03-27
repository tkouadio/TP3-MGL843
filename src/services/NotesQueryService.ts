import { Note } from '../domain/Note';
import { NotesPersistenceManager } from './NotesPersistenceManager';

export class NotesQueryService {
  constructor(private readonly persistence: NotesPersistenceManager) {}

  list(): Note[] {
    return this.persistence.loadAll().sort((a, b) => a.id - b.id);
  }

  search(keyword: string): Note[] {
    return this.persistence.loadAll().filter(note => note.matches(keyword));
  }

  getById(id: number): Note | undefined {
    return this.persistence.findById(id);
  }
}
