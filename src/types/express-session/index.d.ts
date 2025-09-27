import "express-session";

declare module "express-session" {
    //TODO - expand user properties
    interface SessionData {
        user?: {
            id?: string;
            username?: string;
            name?: string;
            loginTime?: Date;
        };
    }
}