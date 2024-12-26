import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IBook } from "../helpers/types";
import { getBookById } from "../helpers/api";

export const BookDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<IBook | null>(null);

    useEffect(() => {
        if (id) {
            getBookById(id).then(setBook).catch(console.error);
        }
    }, [id]);

    if (!book) {
        return <p className="text-center">Loading book details...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
            <p><strong>Pages:</strong> {book.pages}</p>
            <p><strong>Author ID:</strong> {book.authorId}</p>
        </div>
    );
};