import React, { useEffect } from "react";
import { Avatar, List, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPostsAsync } from "../../../store/reducers/postSlice";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    dispatch(fetchAllPostsAsync());
  }, [dispatch]);

  return (
    <div className="">
      <h3 className="text-2xl mb-8">Blog Posts</h3>

      <div className="" >
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 10,
          }}
          dataSource={posts}
          renderItem={(post) => (
            <List.Item
              key={post.title}
              extra={
                <img
                  width={200}
                  alt="Blog Post Thumbnail"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                avatar={<Avatar src="https://example.com/author-avatar.jpg" />}
                title={<a href="#">{post.title}</a>}
                description={post.author}
              />

              <Space direction="vertical">
                <div>{post.content}</div>
                <div>{post.date}</div>
              </Space>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Posts;
