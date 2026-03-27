import { Note } from '../domain/Note';
import { INotesRepository } from '../persistence/NotesRepository';

export class TagService {
  constructor(private readonly repo: INotesRepository) {}

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
    const note = notes.find((n) => n.id === id);

    if (!note) {
      throw new Error('NOTE_NOT_FOUND');
    }

    return note;
  }
}