export interface NoteProps {
  id: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Entité Note (domaine).
 * - Contient des règles simples (ex: normalisation des tags).
 * - La persistance est gérée ailleurs (Repository).
 */
export class Note implements NoteProps {
  id: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;

  constructor(props: NoteProps) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.tags = Note.normalizeTags(props.tags);
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static createNew(id: number, title: string, content: string, tags: string[]): Note {
    const now = new Date().toISOString();
    return new Note({
      id,
      title: title.trim(),
      content: content.trim(),
      tags: Note.normalizeTags(tags),
      createdAt: now,
      updatedAt: now,
    });
  }

  update(fields: { title?: string; content?: string }): void {
    if (typeof fields.title === 'string') {
      this.title = fields.title.trim();
    }
    if (typeof fields.content === 'string') {
      this.content = fields.content.trim();
    }
    this.updatedAt = new Date().toISOString();
  }

  addTag(tag: string): void {
    const normalized = this.normalizeSingleTag(tag);
    if (!normalized) return;

    if (!this.tags.includes(normalized)) {
      this.tags.push(normalized);
      this.tags = Note.normalizeTags(this.tags);
      this.updatedAt = new Date().toISOString();
    }
  }

  removeTag(tag: string): void {
    const normalized = this.normalizeSingleTag(tag);
    if (!normalized) return;

    const before = this.tags.length;
    this.tags = this.tags.filter((x) => x !== normalized);

    if (this.tags.length !== before) {
      this.updatedAt = new Date().toISOString();
    }
  }

  matches(keyword: string): boolean {
    const k = keyword.trim();
    if (!k) return false;
    return (
      this.title.includes(k) ||
      this.content.includes(k) ||
      this.tags.some((tag) => tag.includes(k))
    );
  }

  toJSON(): NoteProps {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      tags: [...this.tags],
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  private normalizeSingleTag(tag: string): string | undefined {
    const trimmed = tag.trim();
    if (!trimmed) {
      return undefined;
    }
    return Note.normalizeTags([trimmed])[0];
  }

  static normalizeTags(tags: string[]): string[] {
    const cleaned = tags
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => t.toLowerCase());

    return Array.from(new Set(cleaned)).sort((a, b) => a.localeCompare(b));
  }
}