import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Me from "./pages/Me";
import Discover from "./pages/Discover";
import Account from "./pages/Account";
import ErrorPage from "./pages/ErrorPage";
import ArticleDetails from "./pages/ArticleDetails";
const AppLayout = () => (
  <>
    <div>
      <Navbar />
      <div className="flex w-full">
        <div className="w-[20vw]">
          <Sidebar />
        </div>
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  </>
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/me",
        element: <Me />,
        children: [
          { path: "blogs/:category", element: <Blogs /> },
          { path: "account", element: <Account /> },
        ],
      },
      {
        path: "discover",
        element: <Discover />,
        children: [
          { path: "article-details/:id", element: <ArticleDetails /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
