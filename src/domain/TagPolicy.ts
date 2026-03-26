export class TagPolicy {
  static normalize(tags: string[]): string[] {
    const cleaned = tags
      .map(tag => tag.trim())
      .filter(Boolean)
      .map(tag => tag.toLowerCase());
    return Array.from(new Set(cleaned)).sort((a, b) => a.localeCompare(b));
  }

  static add(tags: string[], tag: string): string[] {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return tags;

    const normalizedTag = TagPolicy.normalize([trimmedTag])[0];
    if (tags.includes(normalizedTag)) return tags;

    return TagPolicy.normalize([...tags, normalizedTag]);
  }

  static remove(tags: string[], tag: string): string[] {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return tags;

    const normalizedTag = TagPolicy.normalize([trimmedTag])[0];
    return tags.filter(existingTag => existingTag !== normalizedTag);
  }
}
