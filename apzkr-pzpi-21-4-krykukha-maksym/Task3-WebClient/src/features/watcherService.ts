import axios from "axios";
import apiClient from "../config/apiClient";
import { UserInfoDto, WatcherInfoDto } from "../interfaces/account";

const getWatchers = async (

): Promise<UserInfoDto[]> => {
  try {

    const response = await apiClient.get<UserInfoDto[]>(
      'api/watcher',
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

const updateWatcher = async (
  id?:string,
  email?:string,
  phone?:string,
  watcherName?:string,
  watcherSurname?:string,
): Promise<WatcherInfoDto[]> => {
  const request = {email,phone,watcherName,watcherSurname}
  try {

    const response = await apiClient.patch<WatcherInfoDto[]>(
      `api/watcher/${id}`,
      request
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

const watcherService = {
  getWatchers,
  updateWatcher
};

export default watcherService;