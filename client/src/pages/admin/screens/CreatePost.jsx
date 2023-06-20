import React, { useState } from "react";
import { Form, Input, Button, Upload, message, Modal } from "antd";
import { UploadOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { createPostAsync } from "../../../store/reducers/postSlice";
import QuillEditor from "../../../components/QuillEditor";
import ReactQuill from "react-quill";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [body, setBody] = useState("");
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  const dispatch = useDispatch();

  const handlePreview = () => {
    setPreviewVisible(true);
  };

  const handleRemove = () => {
    setPhoto(null);
    setPreviewUrl(null);
  };

  const handleCancelPreview = () => {
    setPreviewVisible(false);
  };

  const handleQuillChange = (value) => {
    setBody(value);
  };

  const handleSubmit = async () => {
    try {
      // Prepare the post data to be dispatched to the store
      const postData = {
        title,
        caption,
        body,
        photo: photo && photo.originFileObj,
      };

      // Dispatch the create post async action
      await dispatch(createPostAsync(postData));
      message.success("Post created successfully");

      // Reset the form fields after successful post creation
      setTitle("");
      setCaption("");
      setBody("");
      setPhoto(null);
      setPreviewUrl(null);
    } catch (error) {
      message.error(error.message || "Failed to create post");
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter a title" }]}
      >
        <Input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Caption"
        name="caption"
        rules={[{ required: true, message: "Please enter a caption" }]}
      >
        <Input
          name="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Body"
        name="body"
        rules={[{ required: true, message: "Please enter the body content" }]}
      >
        <QuillEditor value={body} onChange={handleQuillChange} />
      </Form.Item>

      <Form.Item
        label="Photo"
        name="photo"
        rules={[{ required: true, message: "Please upload a photo" }]}
      >
        <Upload
          accept="image/*"
          showUploadList={false}
          beforeUpload={(file) => {
            setPhoto(file);
            setPreviewUrl(URL.createObjectURL(file));
            return false;
          }}
        >
          {previewUrl ? (
            <div className="relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="object-contain h-40"
              />
              <div className="absolute top-2 right-2 z-50">
                <Button
                  type="link"
                  icon={<EyeOutlined />}
                  onClick={handlePreview}
                />
                <Button
                  type="link"
                  icon={<DeleteOutlined />}
                  onClick={handleRemove}
                />
              </div>
            </div>
          ) : (
            <Button className="flex items-center" icon={<UploadOutlined />}>
              Upload
            </Button>
          )}
        </Upload>
      </Form.Item>

      <Modal open={previewVisible} onCancel={handleCancelPreview} footer={null}>
        <img alt="Preview" style={{ width: "100%" }} src={previewUrl} />
      </Modal>

      <Form.Item>
        <Button
          type="link"
          htmlType="submit"
          className="border-blue-500 text-blue-500"
        >
          Create Blog Post
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreatePost;
