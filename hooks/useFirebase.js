import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDW8phnJWiTo6fYXL7HFbQc2alLirNYAKM",
    authDomain: "tateti-f5758.firebaseapp.com",
    projectId: "tateti-f5758",
    storageBucket: "tateti-f5758.appspot.com",
    messagingSenderId: "687715045233",
    appId: "1:687715045233:web:ac439332a035821addf0d0"
};

export default function useFirebase() {

    const [ app, setApp ] = useState(null);
    const [ auth, setAuth ] = useState(null);
    const [ logged, setLogged ] = useState(false);

    useEffect(() => {
        const app = initializeApp(firebaseConfig);
        setApp(app);
        const auth = getAuth(app);
        setAuth(auth);
        onAuthStateChanged(auth, (user) => {
            setLogged(user !== null);
        });
    }, []);

    return { app, auth, logged };
} 