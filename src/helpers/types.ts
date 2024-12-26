export interface IBook {
    id: number | string;
    title: string;
    pages: number;
    imageUrl: string;
    authorId: number;
}

export interface IAuthor {
    id: number | string;
    name: string;
    surname: string;
}

export type InputBook = Omit<IBook, 'id'>;
export type InputAuthor = Omit<IAuthor, 'id'>;
