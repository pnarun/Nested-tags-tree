import axios from "axios";

const API_BASE = "http://127.0.0.1:5000/api/tags";

// Fetch all tags
export const fetchTags = async () => {
  const response = await axios.get(API_BASE);
  return response.data;
};

// Create new tag
export const createTag = async (tag) => {
  const response = await axios.post(API_BASE, tag);
  return response.data;
};

// Update a tag
export const updateTag = async (id, updatedTag) => {
  const response = await axios.put(`${API_BASE}/${id}`, updatedTag);
  return response.data;
};

// Delete a tag
export const deleteTag = async (id) => {
  const response = await axios.delete(`${API_BASE}/${id}`);
  return response.data;
};
