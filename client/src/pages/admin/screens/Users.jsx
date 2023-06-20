import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Table } from "antd";
import { deleteUser, fetchAllUsers } from "../../../store/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdVerified } from "react-icons/md";
import { AiFillCloseCircle, AiFillDelete } from "react-icons/ai";
import { UPLOADS_URL } from "../../../constants/uploads";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
    width: "60px",
    fixed: "left",
  },
  {
    // title: "Avatar",
    dataIndex: "profilePic",
    name: "profilePic",
    width: 100,
  },
  {
    title: "Name",
    width: 100,
    dataIndex: "name",
    fixed: "left",
  },
  {
    title: "Email",
    width: 100,
    dataIndex: "email",
  },
  {
    title: "Date Joined",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 150,
  },
  {
    title: "Verified",
    dataIndex: "verified",
    key: "2",
    width: 150,
  },
  {
    title: "Role",
    dataIndex: "role",
    width: 150,
  },
  {
    title: "Action",
    dataIndex: "operation",
    fixed: "right",
    width: 100,
  },
];

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);
  const [selectedUser, setSelectedUser] = useState(null);

  console.log(users);
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleDelete = (user) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: `Are you sure you want to delete the user: ${user.name}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        dispatch(deleteUser(user._id));
      },
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const data = users.map((user, i) => ({
    key: i + 1,
    profilePic: (
      <div className="w-[50px] h-[50px] rounded-[50%] overflow-hidden">
        <img className="object-cover w-full h-full" src={UPLOADS_URL + user.profilePic} alt="avatar" />
      </div>
    ),
    name: user.name,
    email: user.email,
    createdAt: new Date(user.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    verified: user.verified ? (
      <MdVerified size={20} className="text-blue-500" />
    ) : (
      <AiFillCloseCircle size={20} className="text-red-500" />
    ),
    role: user.admin === true ? "Admin" : "User",
    operation: (
      <>
        <Button
          type="text"
          className="text-red-600"
          onClick={() => handleDelete(user)}
        >
          <AiFillDelete size={20} />
        </Button>
      </>
    ),
  }));

  return (
    <div className="flex flex-col w-full">
      <h3 className="text-2xl mb-8">Users</h3>
      <div style={{ overflowX: "auto" }}>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default Users;
