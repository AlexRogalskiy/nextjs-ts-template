export type ColorHasher = (x: string) => string;

export type ColorHashers = Record<'decoration' | 'text' | 'bg', ColorHasher>;
