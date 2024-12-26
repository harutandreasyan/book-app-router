import { Link, NavLink, Outlet } from "react-router-dom";

export const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <nav className="bg-gray-800 text-white shadow-lg">
                <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                    <div className="text-xl font-bold">Books App</div>
                    <div className="space-x-4">
                        <NavLink to={"/"} className="text-gray-300 hover:text-white transition-colors">Books</NavLink>
                        <NavLink to={"/add-author"} className="text-gray-300 hover:text-white transition-colors">Add Author</NavLink>
                        <NavLink to={"/add-book"} className="text-gray-300 hover:text-white transition-colors">Add Book</NavLink>
                    </div>
                </div>
            </nav>
            <main className="flex-grow bg-gray-100 p-6">
                <div className="container mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};