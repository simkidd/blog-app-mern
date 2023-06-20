import axios from "../utils/axiosConfig";

export const createPostAPI = async (postData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`/posts`, postData, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllPostsAPI = async () => {
  try {
    const response = await axios.get(`/posts`);
    return response.data.posts;
  } catch (error) {
    throw error.response.data;
  }
};

export const getPostAPI = async (slug) => {
  try {
    const response = await axios.get(`/posts/${slug}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updatePostAPI = async (slug, postData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(`/posts/${slug}`, postData, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deletePostAPI = async (slug, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(`/posts/${slug}`, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
