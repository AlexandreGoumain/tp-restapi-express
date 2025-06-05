import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

export default function ProfilPage() {
    const { user } = useContext(AuthContext)!;

    console.log(user);

    return (
        <>
            <h1>ProfilPage</h1>
            <p>{user?.id}</p>
        </>
    );
}
