import { useEffect, useState } from "react";
import { IBook } from "../helpers/types";
import { getAllBooks, deleteBook } from "../helpers/api";
import { Link } from "react-router-dom";

export const BookList = () => {
    const [books, setBooks] = useState<IBook[]>([]);
    const [selectedBookId, setSelectedBookId] = useState<string | number | null>(null);

    useEffect(() => {
        getAllBooks().then(setBooks);
    }, []); // Fetch books only once on component mount

    const handleDelete = (id: string | number) => {
        console.log("Deleting book with ID:", id);

        // Convert both IDs to strings for comparison
        deleteBook(id)
            .then(() => {
                setBooks(books.filter((book) => String(book.id) !== String(id))); // Convert both to strings before filtering
                setSelectedBookId(null); // Close the modal after deletion
            })
            .catch((error) => {
                console.error("Failed to delete book:", error);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Books</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {books.map((book) => (
                    <div key={book.id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
                        <h2 className="text-lg font-bold text-gray-800">{book.title}</h2>
                        <p className="text-gray-600">Pages: {book.pages}</p>
                        <div className="mt-4 space-x-2">
                            <Link to={`/book/details/${book.id}`} className="text-blue-500 hover:underline">Details</Link>
                            <button
                                className="text-red-500 hover:underline"
                                onClick={() => setSelectedBookId(book.id)} // No conversion here
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedBookId && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <p className="text-gray-800 mb-4">Are you sure you want to delete this book?</p>
                        <div className="flex space-x-4">
                            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDelete(selectedBookId)}>Yes</button>
                            <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setSelectedBookId(null)}>No</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};
