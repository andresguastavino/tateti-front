import { useContext, useRef } from 'react';
import { SocketIoContext } from '../../hooks/SocketIoContex';

export default function Login({ setUsername }) {

    const inputRef = useRef(null);
    
    const { socket } = useContext(SocketIoContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { value } = inputRef.current;

        if(value.length > 3) {
            socket.emit('identify', value);
            setUsername(value);
        } else {
            alert('Username can\'t be empty nor less than 3 characters long');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" ref={inputRef} placeholder="Username..." />
            <button type="submit">Log In</button>
        </form>
    );
}