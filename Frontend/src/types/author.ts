export type Author  = {
    id: number;
    name: string;
    nationality?: string;
    birth_date?: string;
    birth_city?: string;
    description?: string;
};

export type AuthorForm = Omit<Author, "id">;
