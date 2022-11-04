import { FirebaseContext } from '../hooks/FirebaseContext';
import  useFirebase  from '../hooks/useFirebase';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

    const firebase = useFirebase();
  
    return (
        <FirebaseContext.Provider value={ firebase }>
            <Component {...pageProps} />
        </FirebaseContext.Provider>
    );
}

export default MyApp
