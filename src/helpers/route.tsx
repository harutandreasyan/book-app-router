import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout";
import { BookList } from "../pages/BookList";
import { AddAuthor } from "../pages/AddAuthor";
import { AddBook } from "../pages/AddBook";
import { BookDetails } from "../pages/BookDetails";

export const paths = createBrowserRouter([
    {
        path: "",
        element: <Layout />,
        children: [
            { path: "", element: <BookList /> },
            { path: "add-author", element: <AddAuthor /> },
            { path: "add-book", element: <AddBook /> },
            { path: "book/details/:id", element: <BookDetails /> }
        ]
    }
]);
