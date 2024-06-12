import { SessionEnabledStatus } from "@prisma/client";

export class AddSessionDto{
    watcherId:string;
    driverId:string;
    sessionName:string;
}