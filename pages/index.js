import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router'
import { FirebaseContext } from '../hooks/FirebaseContext';
import { signOut } from "firebase/auth";
// import Board from '../components/Board';
// import GameRoom from '../components/GameRoom';

export default function Home() {

    const router = useRouter();

    const { auth, userData, logged } = useContext(FirebaseContext);
    console.log(userData);
    
    useEffect(() => {
        if(!logged) router.push('/auth');
        console.log(userData);
        // if(logged && !userData.username) router.push('/username');
    });

    return (
        <>
            <button type="button"
                onClick={() => {
                    signOut(auth).then(() => {
                        console.log('Signed out succesfully!');
                    })
                    .catch((error) => {
                        const { code, message } = error;
                        console.error(`Error ${ code } ocurred: ${ message }`);
                    });
                }}
            >
                Sign out
            </button>
        </>
    );
}
