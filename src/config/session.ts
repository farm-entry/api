import session from "express-session";
import MongoStore from "connect-mongo";

export const createSessionConfig = (): session.SessionOptions => {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
        throw new Error('MONGO_URL environment variable is required for session storage');
    }

    return {
        secret: process.env.SESSION_SECRET || 'your_secret_key',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: mongoUrl,
            collectionName: 'sessions',
            ttl: 60 * 60 * 24, // 1 day
            autoRemove: 'native'
        }),
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 60 * 60 * 1000 // 1 hour
        },
    };
};

export default createSessionConfig;