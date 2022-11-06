import { useContext } from 'react';
import { useRouter } from 'next/router'
import { FirebaseContext } from '../hooks/FirebaseContext';
import UsernameForm from '../components/UsernameForm';

export default function Username() {

    const router = useRouter();

    const { logged } = useContext(FirebaseContext);

    if(!logged) router.push('/auth');

    return <UsernameForm />

}