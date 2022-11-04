import { useContext } from 'react';
import { useRouter } from 'next/router'
import { FirebaseContext } from '../hooks/FirebaseContext';
import AuthForm from "../components/AuthForm";

export default function Auth() {

    const router = useRouter();
    const { logged } = useContext(FirebaseContext);

    if(logged) router.push('/');
    
    return <AuthForm />
}