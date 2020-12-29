import { API_BASE } from "./Endpoints";
import axios from "axios";

export const GetAllData = async (endpoint) => {
  if (!endpoint) {
    console.log("No end Point provided ");
    return;
  }

  const response = await axios.get(`${API_BASE}/${endpoint}`);

  return {
    data: response.data,
    messsage: response.message ? response.message : "",
  };
};

export const GetSingleData = async (endpoint, id) => {
  if (!endpoint) {
    console.log("No end Point provided ");
    return;
  }
  if (!id) {
    console.log("No Id is given");
    return;
  }

  const response = await axios.get(`${API_BASE}/${endpoint}/${id}`);

  return {
    data: response.data,
    messsage: response.message ? response.message : "",
  };
};

export const PostData = async (endpoint, body) => {
  if (!endpoint) {
    console.log("No end Point provided ");
    return;
  }

  if (!body) {
    console.log("Invalid Data entered");
    return;
  }

  const response = await axios.post(`${API_BASE}/${endpoint}`, body);

  return {
    data: response.data,
    messsage: response.message ? response.message : "",
  };
};

export const PutData = async (endpoint, id, body) => {
  if (!endpoint) {
    console.log("No end Point provided ");
    return;
  }
  if (!id || !body) {
    console.log("Invalid data Entered");
    return;
  }

  const response = await axios.put(`${API_BASE}/${endpoint}/${id}`, body);

  return {
    data: response.data,
    messsage: response.message ? response.message : "",
  };
};

export const DeleteData = async (endpoint, id) => {
  if (!endpoint) {
    console.log("No end Point provided ");
    return;
  }

  if (!id) {
    console.log("No id is Given ");
    return;
  }

  const response = await axios.delete(`${API_BASE}/${endpoint}/${id}`);

  return {
    data: response.data,
    messsage: response.message ? response.message : "",
  };
};
