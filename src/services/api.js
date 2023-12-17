import axios from "axios";
import { getToken } from "./storage";

const defaultClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getToken()}`
  },
});

const clients = {
  default: {
    client: defaultClient,
  }
};

export const thunkHandler = async (asyncFn, thunkAPI) => {
  try {
    const response = await asyncFn;
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response);
  }
};

export default clients;