import { Note } from '../domain/Note';
import { INotesRepository } from '../persistence/NotesRepository';

export class SearchNotes {
  constructor(private readonly repo: INotesRepository) {}

  search(keyword: string): Note[] {
    const notes = this.repo.getAll();
    return notes.filter((n) => n.matches(keyword));
  }

  getById(id: number): Note | undefined {
    return this.repo.getAll().find((n) => n.id === id);
  }
}