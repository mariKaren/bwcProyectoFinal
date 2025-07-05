export interface Review {
    id: number;
    book_id:number;
    user_id:number;
    user: {
        id: number;
        name: string;
    } | null;
    description: string;
    rating?: number;
    created_at?: string;
}