import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login.jsx";
import RegisterPage from "./pages/register.jsx";
import UsersPage from "./pages/user.jsx";
import BookPage from "./pages/books.jsx";
import "../src/styles/global.css";
import TodoApp from "./component/todo/TodoApp.jsx";
import ErrorPage from "./pages/error.jsx";
import { AuthWrapper } from "./component/context/auth.context.jsx";
import PrivateRoute from "./pages/private.route.jsx";
import "nprogress/nprogress.css";
import Home from "./pages/home.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        // element: <TodoApp />,
        element: <Home />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/books",
        element: (
          <PrivateRoute>
            <BookPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/todoapp",
        element: (
          <PrivateRoute>
            <TodoApp />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
);
