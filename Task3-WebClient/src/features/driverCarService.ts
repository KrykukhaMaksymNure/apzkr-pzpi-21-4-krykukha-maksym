import axios from "axios";
import apiClient from "../config/apiClient";
import { DriverCarInfoDto } from "../interfaces/account";

const getDriverCars = async (

): Promise<DriverCarInfoDto[]> => {
  try {

    const response = await apiClient.get<DriverCarInfoDto[]>(
      'api/car',
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

const updateDriverCar = async (
  id?:string,
  model?:string,
  year?:number,
  registrationCity?:string,
): Promise<DriverCarInfoDto[]> => {
  const request = {model,year,registrationCity}
  try {

    const response = await apiClient.patch<DriverCarInfoDto[]>(
      `api/car/${id}`,
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


const driverCarService = {
  getDriverCars,
  updateDriverCar
};

export default driverCarService;