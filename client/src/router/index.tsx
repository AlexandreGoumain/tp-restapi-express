import NotFound from "@/components/NotFound";
import { HomePage } from "@/features";
import Layout from "@/layouts/Layout";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
        ],
    },
]);
