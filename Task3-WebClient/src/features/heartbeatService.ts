import { HeartbeatsInfoDto } from "../interfaces/account";
import axios from "axios";
import apiClient from "../config/apiClient";

const getHeartbeats = async (
    id?:string,
  ) => {
    try {

      const response = await apiClient.get(
        `api/heartbeat/${id}`
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



  const heartbeatService = {
    getHeartbeats
  };

  export default heartbeatService;