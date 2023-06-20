import axios from "../utils/axiosConfig";

const token = localStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const createCommentAPI = async (commentData) => {
  try {
    const response = await axios.post(`/comments`, commentData, config);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const updateCommentAPI = async (commentId, commentData) => {
  try {
    const response = await axios.put(`/comments/${commentId}`, commentData, config);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const deleteCommentAPI = async (commentId) => {
  try {
    const response = await axios.delete(`/comments/${commentId}`, config);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};
