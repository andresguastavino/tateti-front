import { createContext } from 'react';

export const FirebaseContext = createContext({
    app: null,
    auth: null,
    db: null,
    userData: null,
    setUserData: null,
    logged: false,
});