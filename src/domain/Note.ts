import { TagPolicy } from './TagPolicy';

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
    this.tags = TagPolicy.normalize(props.tags);
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static createNew(id: number, title: string, content: string, tags: string[]): Note {
    const now = new Date().toISOString();
    return new Note({
      id,
      title: title.trim(),
      content: content.trim(),
      tags: TagPolicy.normalize(tags),
      createdAt: now,
      updatedAt: now,
    });
  }

  update(fields: { title?: string; content?: string }): void {
    if (typeof fields.title === 'string') this.title = fields.title.trim();
    if (typeof fields.content === 'string') this.content = fields.content.trim();
    this.touch();
  }

  addTag(tag: string): void {
    const nextTags = TagPolicy.add(this.tags, tag);
    if (nextTags !== this.tags) {
      this.tags = nextTags;
      this.touch();
    }
  }

  removeTag(tag: string): void {
    const nextTags = TagPolicy.remove(this.tags, tag);
    if (nextTags.length !== this.tags.length) {
      this.tags = nextTags;
      this.touch();
    }
  }

  matches(keyword: string): boolean {
    const k = keyword.trim();
    if (!k) return false;
    return (
      this.title.includes(k) ||
      this.content.includes(k) ||
      this.tags.some(tag => tag.includes(k))
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

  private touch(): void {
    this.updatedAt = new Date().toISOString();
  }
}
