import { createBrowserRouter, Outlet, redirect, Route, RouterProvider, Routes } from "react-router-dom";
import AddFriend from "./components/AddFriend";
import List from "./components/List";
import Room from "./components/Room";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import io from "socket.io-client";
import { ProtectedRoute } from "./ProtectedRoute";

// const socket = io.connect("http://localhost:3000");
const socket = io("ws://localhost:5000");

const Layout = () => {
    return (
        <>
            <Sidebar />
            <List />
            <Outlet />
        </>
    );
}

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <ProtectedRoute><Layout /></ProtectedRoute>,
            children: [
                {
                    path: "/room/addFriend",
                    element: <AddFriend />
                },
                {
                    path: "/room/:relation_id",
                    element: <Room socket={socket} />
                }
            ]
        },
        {
            path: "/register",
            element: <SignUp />
        },
        {
            path: "/login",
            element: <LoginPage />
        }
    ])

    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;