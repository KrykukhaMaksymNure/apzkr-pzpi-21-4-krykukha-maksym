import axios from "axios";
import apiClient from "../config/apiClient";
import { AccidentInfoDto, UserInfoDto } from "../interfaces/account";

const getAccidents = async (

): Promise<AccidentInfoDto[]> => {
  try {

    const response = await apiClient.get<AccidentInfoDto[]>(
      'api/accident',
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

const updateAccident = async (
  id?:string,
  reason?:string,
  place?:string,
  description?:string,
): Promise<AccidentInfoDto[]> => {
  const request = {reason,place,description}
  try {

    const response = await apiClient.patch<AccidentInfoDto[]>(
      `api/accident/${id}`,
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


const accidentService = {
  getAccidents,
  updateAccident
};

export default accidentService;