import React from 'react'
import {Navigate, useRoutes} from 'react-router-dom'
import Login from "@/views/login/index";

export const rootRouter = [
    {
        path: "/",
        element: <Navigate to="/login" />
    },
    {
        path: "/login",
        element: <Login />
    }
]

const Router = () => {
	const routes = useRoutes(rootRouter);
	return routes;
};

export default Router;