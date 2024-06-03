export interface AuthResultDto {
  userId?: string;
  bearer?: string | undefined;
  role?: string;
}

export interface SignInCommand {
  email?: string | undefined;
  password?: string | undefined;
}

export interface CreateUserCommand {
  email?: string | undefined;
  password?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  phoneNumber?: string | undefined;
}

export interface CreateCustomerCommand extends CreateUserCommand { }
export interface CreateAdminCommand extends CreateUserCommand { }

export interface UserInfoDto {
  id?: string | undefined;
  email?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  phoneNumber?: string | undefined;
  role?: string | undefined;
}

export interface DriverInfoDto {
  id?: string | undefined;
  email?: string | undefined;
  driverName?: string | undefined;
  driverSurname?: string | undefined;
  phone?: string | undefined;
  averageMonthlyHeartbeat?: number | undefined;
  isTaken?:string|undefined
}

export interface HeartbeatsInfoDto {
  id?: string
  count?:number
  description?: string
  createdAt?: string
  driverId?: string
  sessionId?: string
}

export interface DriverCarInfoDto {
  id?: string | undefined;
  model?: string | undefined;
  year?: number | undefined;
  driverId?: string | undefined;
}

export interface AccidentInfoDto {
  id?: string | undefined;
  reason?: string | undefined;
  place?: string | undefined;
  description?: string | undefined;
}


export interface WatcherAuthResultDto {
  watcherId?: string;
  role?: string;
  email?: string;
  phone?: string;
  watcherName?: string;
  watcherSurname?:string;
  password?:string
}

export interface WatcherAuthResult {
  id?: string;
  role?:string;
}

export interface CreateUserCommand {
  email?: string | undefined;
  password?: string | undefined;
  watcherName?: string | undefined;
  watcherSurname?: string | undefined;
  phone?: string | undefined;
}

export interface WatcherInfoDto
{
  id?: string;
  phone?: string;
  watcherName?: string;
  watcherSurname?: string;
  isTaken?: string;
  createdAt?: string;
  updatedAt?: string;
  email?: string;
  role?: string;
  password?: string;
}

export interface CreateWatcherCommand extends CreateUserCommand { }
