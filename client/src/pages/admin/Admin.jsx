import React from "react";
import { Card, Col, Row, List, Avatar, Table } from "antd";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaBlog } from "react-icons/fa";
import { HiUser, HiUsers } from "react-icons/hi";

const Admin = () => {
  // Sample data for new registered users
  const newRegisteredUsers = [
    { id: 1, name: "John Doe", avatar: "https://example.com/avatar1.jpg" },
    { id: 2, name: "Jane Smith", avatar: "https://example.com/avatar2.jpg" },
    { id: 3, name: "Alex Johnson", avatar: "https://example.com/avatar3.jpg" },
  ];

  // Sample data for recent comments
  const recentComments = [
    {
      id: 1,
      user: { name: "John Doe", avatar: "https://example.com/avatar1.jpg" },
      comment: "Great article! Thanks for sharing.",
    },
    {
      id: 2,
      user: { name: "Jane Smith", avatar: "https://example.com/avatar2.jpg" },
      comment: "I found this very informative. Keep up the good work!",
    },
    {
      id: 3,
      user: { name: "Alex Johnson", avatar: "https://example.com/avatar3.jpg" },
      comment: "Awesome content. Looking forward to more!",
    },
  ];

  // Sample data for recent articles
  const recentArticles = [
    { id: 1, title: "Introduction to React", date: "2023-06-15" },
    { id: 2, title: "Mastering CSS Flexbox", date: "2023-06-14" },
    { id: 3, title: "JavaScript Best Practices", date: "2023-06-13" },
  ];

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title, record) => (
        <div className="flex items-center">
          <img
            src={record.image}
            alt={title}
            className="w-10 h-10 rounded-full"
          />
          <p className="ml-2">{title}</p>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      // render: (category) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: "Comments",
      dataIndex: "commentCount",
      key: "commentCount",
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card hoverable>
            <div className="flex items-center">
              <div className="mr-4">
                <AiOutlineDashboard size={48} />
              </div>
              <div>
                <p className="text-xl font-semibold mb-1">10</p>
                <h3 className="text-lg">Dashboard</h3>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable>
            <div className="flex items-center">
              <div className="mr-4">
                <FaBlog size={48} />
              </div>
              <div>
                <p className="text-xl font-semibold mb-1">10</p>
                <h3 className="text-lg">Posts</h3>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable>
            <div className="flex items-center">
              <div className="mr-4">
                <HiUsers size={48} />
              </div>
              <div>
                <p className="text-xl font-semibold mb-1">10</p>
                <h3 className="text-lg">Users</h3>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable>
            <div className="flex items-center">
              <div className="mr-4">
                <HiUser size={48} />
              </div>
              <div>
                <p className="text-xl font-semibold mb-1">10</p>
                <h3 className="text-lg">Account</h3>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4" gutter={[16, 16]}>
        <Col span={12}>
          <Card title="New Registered Users">
            <List
              itemLayout="horizontal"
              dataSource={newRegisteredUsers}
              renderItem={(user) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={user.avatar} />}
                    title={user.name}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Recent Comments">
            <List
              itemLayout="horizontal"
              dataSource={recentComments}
              renderItem={(comment) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={comment.user.avatar} />}
                    title={comment.user.name}
                    description={comment.comment}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Recent Articles">
            <Table
              dataSource={recentArticles}
              columns={columns}
              pagination={false}
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Admin;
