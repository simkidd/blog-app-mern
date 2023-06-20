import axios from "../utils/axiosConfig";
import { toast } from "react-hot-toast";

export const registerAPI = async (userData) => {
  try {
    const { data } = await axios.post("/auth/register", {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });

    return data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error);
  }
};

export const loginAPI = async (userData) => {
  try {
    const { data } = await axios.post("/auth/login", {
      email: userData.email,
      password: userData.password,
    });

    return data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error );
  }
};
