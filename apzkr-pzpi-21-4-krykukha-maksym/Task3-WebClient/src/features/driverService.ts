import axios from "axios";
import apiClient from "../config/apiClient";
import { DriverInfoDto, UserInfoDto } from "../interfaces/account";

const getDrivers = async (

): Promise<DriverInfoDto[]> => {
  try {

    const response = await apiClient.get<UserInfoDto[]>(
      'api/driver/',
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

const updateDriver = async (
  id?:string,
  email?:string,
  phone?:string,
  driverName?:string,
  driverSurname?:string,
): Promise<DriverInfoDto[]> => {
  const request = {email,phone,driverName,driverSurname}
  try {

    const response = await apiClient.patch<DriverInfoDto[]>(
      `api/driver/${id}`,
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

const takeWatcher = async (
  driverId?:string,
  watcherId?:string
) => {
  const request = {driverId,watcherId}
  try {

    const response = await apiClient.post(
      `api/driver/add-watcher`,
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

const deleteWatcher = async (
  driverId?:string,
) => {
  const request = {driverId}
  try {

    const response = await apiClient.post(
      `api/driver/delete-watcher`,
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

const driverService = {
    getDrivers,
    updateDriver,
    takeWatcher,
    deleteWatcher
};

export default driverService;