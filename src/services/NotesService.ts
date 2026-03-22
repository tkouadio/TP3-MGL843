import { Note } from '../domain/Note';
import { INotesRepository } from '../persistence/NotesRepository';
import { NotesStoreHelper } from './NotesStoreHelper';

export class NotesService {
  private readonly storeHelper: NotesStoreHelper;

  constructor(private readonly repo: INotesRepository) {
    this.storeHelper = new NotesStoreHelper(repo);
  }

  list(): Note[] {
    return this.storeHelper.loadAll().sort((a, b) => a.id - b.id);
  }

  search(keyword: string): Note[] {
    return this.storeHelper
      .loadAll()
      .filter(note => note.matches(keyword));
  }

  getById(id: number): Note | undefined {
    return this.storeHelper.findById(id, this.storeHelper.loadAll());
  }

  create(title: string, content: string, tags: string[]): Note {
    const notes = this.storeHelper.loadAll();
    const nextId = this.storeHelper.computeNextId(notes);
    const note = Note.createNew(nextId, title, content, tags);
    notes.push(note);
    this.storeHelper.saveAll(notes);
    return note;
  }

  update(id: number, fields: { title?: string; content?: string }): Note {
    const notes = this.storeHelper.loadAll();
    const note = this.storeHelper.findByIdOrThrow(id, notes);
    note.update(fields);
    this.storeHelper.saveAll(notes);
    return note;
  }

  delete(id: number): void {
    const notes = this.storeHelper.loadAll();
    const filtered = notes.filter(note => note.id !== id);
    if (filtered.length === notes.length) {
      throw new Error('NOTE_NOT_FOUND');
    }
    this.storeHelper.saveAll(filtered);
  }

  addTag(id: number, tag: string): Note {
    const notes = this.storeHelper.loadAll();
    const note = this.storeHelper.findByIdOrThrow(id, notes);
    note.addTag(tag);
    this.storeHelper.saveAll(notes);
    return note;
  }

  removeTag(id: number, tag: string): Note {
    const notes = this.storeHelper.loadAll();
    const note = this.storeHelper.findByIdOrThrow(id, notes);
    note.removeTag(tag);
    this.storeHelper.saveAll(notes);
    return note;
  }
}