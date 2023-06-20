import axios from '../utils/axiosConfig';

// Fetch all users (admin)
export const getAllUsersAPI = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get('/users', config);
    // console.log(response.data)
    return response.data.users;
  } catch (error) {
    throw error.response.data;
  }
};

// Fetch a user (admin)
export const getUserAPI = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`/users/${id}`, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update a user (admin)
export const updateUserAPI = async (id, userData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.put(`/users/${id}`, userData, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete a user (admin)
export const deleteUserAPI = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.delete(`/users/${id}`, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fetch user profile
export const getUserProfileAPI = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get('/profile', config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update user profile
export const updateUserProfileAPI = async (userData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.put('/profile', userData, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete user profile
export const deleteUserProfileAPI = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.delete('/profile', config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
