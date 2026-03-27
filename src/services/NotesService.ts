import { Note } from '../domain/Note';
import { INotesRepository } from '../persistence/NotesRepository';
import { NotesCommandService } from './NotesCommandService';
import { NotesPersistenceManager } from './NotesPersistenceManager';
import { NotesQueryService } from './NotesQueryService';

export class NotesService {
  private readonly queryService: NotesQueryService;
  private readonly commandService: NotesCommandService;

  constructor(repo: INotesRepository) {
    const persistence = new NotesPersistenceManager(repo);
    this.queryService = new NotesQueryService(persistence);
    this.commandService = new NotesCommandService(persistence);
  }

  list(): Note[] {
    return this.queryService.list();
  }

  search(keyword: string): Note[] {
    return this.queryService.search(keyword);
  }

  getById(id: number): Note | undefined {
    return this.queryService.getById(id);
  }

  create(title: string, content: string, tags: string[]): Note {
    return this.commandService.create(title, content, tags);
  }

  update(id: number, fields: { title?: string; content?: string }): Note {
    return this.commandService.update(id, fields);
  }

  delete(id: number): void {
    this.commandService.delete(id);
  }

  addTag(id: number, tag: string): Note {
    return this.commandService.addTag(id, tag);
  }

  removeTag(id: number, tag: string): Note {
    return this.commandService.removeTag(id, tag);
  }
}
