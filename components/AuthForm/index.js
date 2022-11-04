import { useRef, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../hooks/FirebaseContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import styles from './Auth.module.css';

export default function AuthForm() {

    const [ login, setLogin ] = useState(true);

    const inputEmailRef = useRef(null);
    const inputPasswordRef = useRef(null);
        
    const { auth, db } = useContext(FirebaseContext);
    
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        const { value: email } = inputEmailRef.current; 
        const { value: password } = inputPasswordRef.current; 

        if(login) {
            signInWithEmailAndPassword(auth, email, password)
                .then(handleThen)
                .catch((error) => {
                    const { code, message } = error;
                    console.error(`Error ${ code } ocurred: ${ message }`);
                });
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then(handleThen)
                .catch((error) => {
                    const { code, message } = error;
                    console.error(`Error ${ code } ocurred: ${ message }`);
                });
        }
    }

    const handleThen = async (userCredential) => {
        const { uid } = userCredential.user;
        const docRef = doc(db, 'users', uid);

        if(login) {
            const docSnap = await getDoc(docRef)
                .catch((error) => {
                    const { code, message } = error;
                    console.error(`Error ${ code } ocurred: ${ message }`);
                });

            if(docSnap.exists()) {
                console.log(docSnap.data());
            } else {
                console.log('Document don\'t exists');
            }
        } else {
            const initialData = {
                uid,
                username: null,
                gamesPlayed: 0,
                gamesWon: 0,
                friends: [],
            }

            await setDoc(docRef, initialData)
                .catch((error) => {
                    const { code, message } = error;
                    console.error(`Error ${ code } ocurred: ${ message }`);
                });
        }

        router.push('/');
    }

    const handleClick = () => {
        setLogin(currentLogin => !currentLogin);
    }

    return (
        <>
            <header className={styles.formHeader}>
                <h2>
                    { login ? 'Login' : 'Register' }
                </h2>    
            </header>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text" 
                        id="email" 
                        name="email" 
                        placeholder="Type your email" 
                        ref={ inputEmailRef }
                    />
                </div>
                <div className={styles.formRow}>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="******" 
                        ref={ inputPasswordRef }
                    />
                </div>
                <div className={styles.formRow}>
                    <button type="submit">
                        { 
                            login ? 'Login' : 'Register'
                        }
                    </button>
                </div>
            </form>
            <footer className={styles.formFooter}>
                <a onClick={handleClick}>
                    {
                        login ? 'Register instead' : 'Login instead'
                    }
                </a>
            </footer>
        </>
    );
}