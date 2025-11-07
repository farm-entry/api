import session from "express-session";
import MongoStore from "connect-mongo";

export const createSessionConfig = (): session.SessionOptions => {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
        throw new Error('MONGO_URL environment variable is required for session storage');
    }

    const isProduction = process.env.NODE_ENV === 'production';
    const isHeroku = !!process.env.DYNO; // Heroku sets this environment variable

    return {
        secret: process.env.SESSION_SECRET || 'your_secret_key',
        resave: false,
        saveUninitialized: false,
        name: 'sessionId', // Custom session name
        store: MongoStore.create({
            mongoUrl: mongoUrl,
            collectionName: 'sessions',
            ttl: 60 * 60 * 24, // 1 day
            autoRemove: 'native'
        }),
        cookie: {
            secure: isProduction && isHeroku, // Only secure on Heroku production
            httpOnly: true, // Always true for security
            maxAge: 60 * 60 * 1000, // 1 hour
            sameSite: isProduction ? 'none' : 'lax', // 'none' required for cross-origin on Heroku
            domain: isHeroku ? undefined : undefined // Let browser handle domain
        },
    };
};

export default createSessionConfig;