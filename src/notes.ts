/**
 * (Legacy TP1) Fonctions utilitaires.
 * Conservé pour compatibilité, mais la version TP2/TP3 utilise
 * NotesService + SearchNotes + Repository.
 */
import * as path from 'path';
import { FileNotesRepository } from './persistence/NotesRepository';
import { NotesService } from './services/NotesService';
import { SearchNotes } from './services/SearchNotes';

const NOTES_FILE = path.join(__dirname, '../notes.json');
const repo = new FileNotesRepository(NOTES_FILE);

const notesService = new NotesService(repo);
const searchNotesService = new SearchNotes(repo);

export function loadNotes() {
  return notesService.list().map((n) => n.toJSON());
}

export function createNote(title: string, content: string, tags: string[]) {
  return notesService.create(title, content, tags).toJSON();
}

export function searchNotes(keyword: string) {
  return searchNotesService.search(keyword).map((n) => n.toJSON());
}

export function listNotes() {
  return notesService.list().map((n) => n.toJSON());
}