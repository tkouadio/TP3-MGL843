import express from 'express';
import path from 'path';
import { FileNotesRepository } from '../persistence/NotesRepository';
import { NotesService } from '../services/NotesService';
import { SearchNotes } from '../services/SearchNotes';
import { TagService } from '../services/TagService';
import { buildRoutes } from './routes';

export function createApp(options?: { notesFile?: string }) {
  const app = express();

  app.use(express.urlencoded({ extended: true }));

  const viewsPath = path.join(__dirname, 'views');
  app.set('views', viewsPath);
  app.set('view engine', 'pug');

  const notesFile = options?.notesFile ?? path.join(__dirname, '../../notes.json');
  const repo = new FileNotesRepository(notesFile);

  const notesService = new NotesService(repo);
  const searchNotes = new SearchNotes(repo);
  const tagService = new TagService(repo);

  app.use(buildRoutes(notesService, searchNotes, tagService));

  app.use((err: any, _req: any, res: any, _next: any) => {
    const message = err?.message ?? 'Erreur inconnue';
    res.status(500).send(message);
  });

  return app;
}

if (require.main === module) {
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  const notesFile = process.env.NOTES_FILE;
  const app = createApp({ notesFile });
  app.listen(port, () => console.log(`Notes web app running on http://localhost:${port}`));
}