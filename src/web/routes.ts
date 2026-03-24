import { Router } from 'express';
import { NotesService } from '../services/NotesService';
import { SearchNotes } from '../services/SearchNotes';
import { TagService } from '../services/TagService';

export function buildRoutes(
  notesService: NotesService,
  searchNotes: SearchNotes,
  tagService: TagService
) {
  const router = Router();

  router.get('/', (_req, res) => res.redirect('/notes'));

  router.get('/notes', (req, res) => {
    const q = typeof req.query.q === 'string' ? req.query.q : '';
    const notes = q ? searchNotes.search(q) : notesService.list();
    res.render('index', { notes, q });
  });

  router.get('/notes/new', (_req, res) => {
    res.render('note_form');
  });

  router.post('/notes', (req, res) => {
    const title = String(req.body.title ?? '');
    const content = String(req.body.content ?? '');
    const tagsRaw = String(req.body.tags ?? '');
    const tags = tagsRaw.split(',').map((t: string) => t.trim()).filter(Boolean);

    notesService.create(title, content, tags);
    res.redirect('/notes');
  });

  router.get('/notes/:id/edit', (req, res) => {
    const id = Number(req.params.id);
    const note = searchNotes.getById(id);

    if (!note) {
      return res.status(404).send('Note introuvable');
    }

    res.render('note_edit', { note });
  });

  router.post('/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const title = String(req.body.title ?? '');
    const content = String(req.body.content ?? '');

    notesService.update(id, { title, content });
    res.redirect(`/notes/${id}/edit`);
  });

  router.post('/notes/:id/delete', (req, res) => {
    const id = Number(req.params.id);
    notesService.delete(id);
    res.redirect('/notes');
  });

  router.post('/notes/:id/tags/add', (req, res) => {
    const id = Number(req.params.id);
    const tag = String(req.body.tag ?? '');

    tagService.addTagToNote(id, tag);
    res.redirect(`/notes/${id}/edit`);
  });

  router.post('/notes/:id/tags/remove', (req, res) => {
    const id = Number(req.params.id);
    const tag = String(req.body.tag ?? '');

    tagService.removeTagFromNote(id, tag);
    res.redirect(`/notes/${id}/edit`);
  });

  return router;
}