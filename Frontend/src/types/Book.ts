import type { Author } from "./author";

export type Book = {
    id: number;
    title: string;
    author_id: number;
    cover?: string;
    genre?: string;
    description?: string;
    publication_date?: string;
    created_at?: string;
    updated_at?: string;
    author: Author
};