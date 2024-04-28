import React, { useContext, createContext, useState, useLayoutEffect } from 'react'
import { auth } from '../firebase-config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const detailsCollectionRef = collection(db, 'details')

    const signup = async (type, full_name, username, email, password) => {
        const template = 'https://ouch-cdn2.icons8.com/a_sd5UkdMVzcLgEHtyVFVHmaX3S8N6os66vnRG0nWNk/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNjI2/LzZjNjM0NzQxLWQ4/OWQtNGQ5OC1iZGI4/LWIxYmQ0NmFjMjc0/Zi5zdmc.png'
        try {
            await createUserWithEmailAndPassword(auth, email, password).catch((err) =>
                console.log(err)
            );
            await updateProfile(auth.currentUser, {displayName: username, photoURL: template }).catch(
                (err) => console.log(err)
            );
            await addDoc(detailsCollectionRef, {
                username: username,
                type: type,
                full_name: full_name,
            })
        } catch (err) {
            console.log(err);
        }
    };

    const login = async (email, password) => {
        try{
            await signInWithEmailAndPassword(auth, email, password).catch((err) => alert('User not found. Please create an account before signing in'))
        } catch(err) {
            alert('User not found. Please create an account before signing in')
        }
    }

    const logout = () => {
        auth.signOut()
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(email)
    }

    useLayoutEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return unsubscribe;
    }, [])

    console.log(currentUser)

    return (
        <AuthContext.Provider value={{
            currentUser, setCurrentUser, signup, login, logout, resetPassword
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useStateContext = () => useContext(AuthContext)

