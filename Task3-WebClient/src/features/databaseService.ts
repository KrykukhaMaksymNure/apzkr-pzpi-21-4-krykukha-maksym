import axios from "axios";
import apiClient from "../config/apiClient";

const exportDatabase = async (
) => {
  try {
    const response = await apiClient.get(
      '/api/database/export',
      { responseType: 'arraybuffer' }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error occurred.");
    }
  }
};

const importDatabase = async (
  file: File,
) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const response = await apiClient.post(
      '/api/database/import',
      formData,
      { headers }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error occurred.");
    }
  }
};

const databaseService = {
  exportDatabase,
  importDatabase
};

export default databaseService;