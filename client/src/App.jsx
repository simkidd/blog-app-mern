import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './app.scss'
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import AdminLayout from "./layouts/AdminLayout";
import Admin from "./pages/admin/Admin";
import MainLayout from "./layouts/MainLayout";
import CropEasy from "./components/crop/CropEasy";
import ArticleDetail from "./pages/article/ArticleDetail";
import Users from "./pages/admin/screens/Users";
import Settings from "./pages/admin/screens/Settings";
import Posts from "./pages/admin/screens/Posts";
import CreatePost from "./pages/admin/screens/CreatePost";
import ArticlesPage from "./pages/article/ArticlesPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/posts" element={<ArticlesPage />} />
          <Route path="/posts/:slug" element={<ArticleDetail />} />
          {/* <Route path="/profile" element={<CropEasy />} /> */}
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Admin />} />
          <Route path="create" element={<CreatePost />} />
          <Route path="posts" element={<Posts />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
