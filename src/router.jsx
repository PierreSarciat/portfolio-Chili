import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Layout from '@components/Layout/Layout.jsx';
import Region from '@pages/region/Region.jsx';


const router = createBrowserRouter([
    {

        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <App /> },
            { path: 'region', element: <Region /> },

        ]
    },
],
);

export default function Router() {
    return <RouterProvider router={router} />;
}