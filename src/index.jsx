import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Protected, Login } from "./components";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import AllPosts from "./pages/AllPosts";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: (
					<Protected authentication={false}>
						<Login />
					</Protected>
				),
			},
			{
				path: "/signup",
				element: (
					<Protected authentication={false}>
						<SignUp />
					</Protected>
				),
			},
			{
				path: "/all-posts",
				element: (
					<Protected authentication={true} admin path="/all-posts">
						<AllPosts />
					</Protected>
				),
			},
			{
				path: "/add-post",
				element: (
					<Protected authentication admin path="/add-post">
						<AddPost />
					</Protected>
				),
			},
			{
				path: "/edit-post/:slug",
				element: (
					<Protected authentication admin="false">
						<EditPost />
					</Protected>
				),
			},
			{ path: "/post/:slug", element: <Post /> },
			{ path: "/contact", element: <Contact /> },
			{ path: "/faqs", element: <FAQs /> },
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>,
);
