import { SessionEnabledStatus } from "@prisma/client";

export class UpdateSessionDto{
    isEnabled:SessionEnabledStatus;
}