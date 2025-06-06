import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import RootLayout from './RootLayout';
import List from './List';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Create from './Create';
import View from './View';
import Update from './Update';

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <List /> },
            { path: 'create', element: <Create /> },
            { path: 'view/:view_id', element: <View />},
            { path: 'update/:update_id', element: <Update />}
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
