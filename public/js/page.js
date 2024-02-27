'use client'
import { get, query, ref } from 'firebase/database'
import {useEffect, useState} from 'react'
import { db } from './firebaseConfig'

export default function Page() {
    const [users, setUsers] = useState([]); // Create a state variable to store users
    useEffect(() => {
        const usersRef = collection(db, 'users');
        getDocs(usersRef).then((querySnapshot) => {
            const usersArray = querySnapshot.docs.map((doc) => ({ 
                id: doc.id, 
                ...doc.data() 
            }));
            setUsers(usersArray); // Set the users state variable to the data from the users collection
        });
    }, []);
    
    return (
        <div>
            <h1>Users</h1>
            <ul>
            {users.map((user) => (
                    // Assuming user object has a 'firstname' and 'lastname' field
                    <li key={user.id}>{user.fornavn} {user.etternavn}</li>
                ))}
            </ul>
        </div>
    );
}

