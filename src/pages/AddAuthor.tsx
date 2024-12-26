import { useForm, SubmitHandler } from "react-hook-form";
import { addNewAuthor } from "../helpers/api";
import { InputAuthor } from "../helpers/types";
import { useNavigate } from "react-router-dom";

export const AddAuthor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<InputAuthor>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<InputAuthor> = async (data) => {
        try {
            await addNewAuthor(data);
            navigate("/");
        } catch (error) {
            console.error("Failed to add author:", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Author</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Name</label>
                        {errors.name && <p className="text-red-400">{errors.name.message}</p>}
                        <input
                            {...register("name", { required: "Name is required" })}
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Surname</label>
                        {errors.surname && <p className="text-red-400">{errors.surname.message}</p>}
                        <input
                            {...register("surname", { required: "Surname is required" })}
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                    >
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
};