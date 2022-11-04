import { useContext } from 'react';
import { FirebaseContext } from '../hooks/FirebaseContext';
import { signOut } from "firebase/auth";
// import Board from '../components/Board';
// import GameRoom from '../components/GameRoom';

export default function Home() {

    const { auth } = useContext(FirebaseContext);

    return (
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
    );
}
