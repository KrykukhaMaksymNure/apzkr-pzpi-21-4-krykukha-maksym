import axios from "axios";
import apiClient from "../config/apiClient";
import { AuthResultDto, CreateAdminCommand, CreateCustomerCommand, CreateWatcherCommand, SignInCommand, WatcherAuthResultDto } from "../interfaces/account";

const signInWatcher = async (
  email : string,
  password : string,
  phone:string,
  watcherName:string,
  watcherSurname:string
): Promise<WatcherAuthResultDto> => {
  try {
    const request = { email, password,phone,watcherName,watcherSurname };
    const response = await apiClient.post<WatcherAuthResultDto>(
      '/api/auth/watcher_login',
      request
    );
    console.log("RESULT FROM SIGNINWATCHER")
    console.log(response.data)
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error occurred.");
    }
  }
};


const signUpWatcher = async (
  email : string,
  password : string,
  watcherName : string,
  watcherSurname: string,
  phone: string
): Promise<AuthResultDto> => {
  try {
    const request: CreateWatcherCommand = {
      email,
      password,
      watcherName,
      watcherSurname,
      phone
    };
    const response = await apiClient.post<WatcherAuthResultDto>(
      '/api/auth/watcher_signup',
      request
    );
    console.log("console from signup watcher")
    console.log(response.data)
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error occurred.");
    }
  }
};

const authService = {
  signInWatcher,
  signUpWatcher,
};

export default authService;