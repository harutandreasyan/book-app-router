import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { paths } from './helpers/route';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={paths} />
);