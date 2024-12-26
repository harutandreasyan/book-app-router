import { useForm, SubmitHandler } from "react-hook-form";
import { addNewBook, getAllAuthors } from "../helpers/api";
import { InputBook, IAuthor } from "../helpers/types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const AddBook = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<InputBook>();
    const navigate = useNavigate();
    const [authors, setAuthors] = useState<IAuthor[]>([]);

    useEffect(() => {
        getAllAuthors()
            .then(setAuthors)
            .catch((error) => {
                console.error("Failed to fetch authors:", error);
            });
    }, []);

    const onSubmit: SubmitHandler<InputBook> = async (data) => {
        try {
            const newBook = await addNewBook(data);
            // Assuming BookList component has a callback to update its state
            navigate("/"); // Go to the book list page, or directly update the list if on the same page
        } catch (error) {
            console.error("Failed to add book:", error);
        }
    };
    

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Book</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Title</label>
                        {errors.title && <p className="text-red-400">{errors.title.message}</p>}
                        <input
                            {...register("title", { required: "Title is required" })}
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Pages</label>
                        {errors.pages && <p className="text-red-400">{errors.pages.message}</p>}
                        <input
                            {...register("pages", { required: "Pages is required", valueAsNumber: true })}
                            type="number"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Author</label>
                        <select
                            {...register("authorId", { required: "Author is required", valueAsNumber: true })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="">Select an Author</option>
                            {authors.map((author) => (
                                <option key={author.id} value={author.id}>{author.name} {author.surname}</option>
                            ))}
                        </select>
                        {errors.authorId && <p className="text-red-400">{errors.authorId.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                    >
                        Add Book
                    </button>
                </form>
            </div>
        </div>
    );
};
