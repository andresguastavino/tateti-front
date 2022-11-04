import { createContext } from 'react';

export const FirebaseContext = createContext({
    app: null,
    auth: null,
    db: null,
    logged: false
});