import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Avatar, Badge, Button, Layout, Menu, theme } from "antd";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaBlog, FaRegEnvelope } from "react-icons/fa";
import { HiUsers, HiUser, HiMenuAlt2, HiMenuAlt3 } from "react-icons/hi";
import { FiBell, FiSettings } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { MdPostAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/reducers/authSlice";
import { UPLOADS_URL } from "../constants/uploads";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Get user information from Redux store
  const user = useSelector((state) => state.auth.user);

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/");
    toast.success("Logout successful!");
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo flex items-center justify-center">
          <Link
            to="/"
            className="text-white text-center py-4 mb-0 text-3xl font-bold"
          >
            Spot.
          </Link>
        </div>
        <div className="flex flex-col h-[90%] justify-between box-border">
          <Menu
            className="overflow-y-auto"
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["dashboard"]}
            onClick={({ key }) => {
              if (key == "signout") {
              } else {
                navigate(key);
              }
            }}
            items={[
              {
                key: "dashboard",
                icon: <AiOutlineDashboard size={20} />,
                label: "Dashboard",
              },
              {
                key: "posts",
                icon: <FaBlog size={20} />,
                label: "Posts",
                children: [
                  {
                    key: "create",
                    icon: <MdPostAdd size={24} />,
                    label: " Create a new blog",
                  },
                  {
                    key: "posts",
                    icon: <FaBlog size={20} />,
                    label: "View blog posts",
                  },
                ],
              },
              {
                key: "users",
                icon: <HiUsers size={20} />,
                label: "Users",
                children: [
                  {
                    key: "users",
                    icon: <HiUsers size={20} />,
                    label: "Users",
                  },
                ],
              },
              {
                key: "account",
                icon: <HiUser size={20} />,
                label: "Account",
                children: [
                  {
                    key: "settings",
                    icon: <FiSettings size={20} />,
                    label: "Settings",
                  },
                ],
              },
            ]}
          />

          <Menu
            theme="dark"
            className="text-red-500"
            onClick={logoutHandler}
            mode="inline"
            items={[
              {
                icon: <CiLogout size={24} />,
                label: "Logout",
              },
            ]}
          />
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="w-full flex items-center"
        >
          <div className="w-full flex items-center px-2 justify-between">
            <Button
              type="text"
              icon={
                collapsed ? <HiMenuAlt2 size={28} /> : <HiMenuAlt3 size={28} />
              }
              onClick={() => setCollapsed(!collapsed)}
              className="flex items-center justify-center"
            />
            <div className="flex items-center gap-4">
              <Badge count={2} size="small" className="cursor-pointer">
                <FaRegEnvelope size={20} />
              </Badge>
              <Badge count={3} size="small" className="cursor-pointer">
                <FiBell size={20} />
              </Badge>
              <div className="flex items-center gap-2 ml-4 mr-4">
                <span className="font-bold">{user.name}</span>
                <Avatar
                  size={45}
                  src={UPLOADS_URL + user.profilePic}
                  alt={user.name}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
