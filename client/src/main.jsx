import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter } from "react-router-dom"
import { Route, RouterProvider, createRoutesFromElements } from "react-router"

// Files
import App from "./App.jsx"
import "./index.css"
import Home from "./pages/Home.jsx"
import Blogs from "./pages/Blogs.jsx"
import SingleBlog from "./pages/SingleBlog.jsx"
import { Provider } from "react-redux"
import { store } from "./app/store.js"
import CreateBlog from "./pages/CreateBlog.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Profile from "./pages/Profile.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import ProtectedRouteForAuth from "./components/ProtectedRouteForAuth.jsx"
import MyBlogs from "./pages/MyBlogs.jsx"
import Logout from "./pages/Logout.jsx"
import EditBlog from "./pages/EditBlog.jsx"
import ProtectedRouteForAdmin from "./components/ProtectedRouteForAdmin.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx"

// Creating Routers
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App />}
    >
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/blogs"
        element={<Blogs />}
      />
      <Route
        path="/blogs/:slug"
        element={<SingleBlog />}
      />

      <Route
        path=""
        element={<ProtectedRoute />}
      >
        <Route
          path="/profile"
          element={<Profile />}
        >
          <Route
            path=""
            element={<MyBlogs />}
          />
          <Route
            path="logout"
            element={<Logout />}
          />
        </Route>

        <Route
          path="/createblog"
          element={<CreateBlog />}
        />
        <Route
          path="/editblog/:slug"
          element={<EditBlog />}
        />
      </Route>

      <Route
        path=""
        element={<ProtectedRouteForAdmin />}
      >
        <Route
          path="/admindashboard"
          element={<AdminDashboard />}
        />
      </Route>

      <Route
        path=""
        element={<ProtectedRouteForAuth />}
      >
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
