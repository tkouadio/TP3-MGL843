import { Note } from '../domain/Note';
import { INotesRepository } from '../persistence/NotesRepository';

export class TagService {
  constructor(private readonly repo: INotesRepository) {}

  addTagToNote(id: number, tag: string): Note {
    const notes = this.loadNotes();
    const note = this.findNoteOrThrow(id, notes);

    const trimmedTag = tag.trim();
    if (!trimmedTag) {
      return note;
    }

    const normalizedTag = Note.normalizeTags([trimmedTag])[0];

    if (!note.tags.includes(normalizedTag)) {
      note.tags.push(normalizedTag);
      note.tags = Note.normalizeTags(note.tags);
      note.updatedAt = new Date().toISOString();
      this.saveNotes(notes);
    }

    return note;
  }

  removeTagFromNote(id: number, tag: string): Note {
    const notes = this.loadNotes();
    const note = this.findNoteOrThrow(id, notes);

    const trimmedTag = tag.trim();
    if (!trimmedTag) {
      return note;
    }

    const normalizedTag = Note.normalizeTags([trimmedTag])[0];
    const before = note.tags.length;

    note.tags = note.tags.filter((t) => t !== normalizedTag);

    if (note.tags.length !== before) {
      note.updatedAt = new Date().toISOString();
      this.saveNotes(notes);
    }

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