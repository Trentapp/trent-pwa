import React, {useContext, useState, useEffect} from 'react';
import {auth} from "../firebase";
//import { GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import firebase from "firebase/app";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const googleAuth = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        return auth.signInWithPopup(googleProvider);
    }

    const appleAuth = () => {
        const appleProvider = new firebase.auth.OAuthProvider('apple.com');
        return auth.signInWithPopup(appleProvider);
    }

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updatePassword,
        appleAuth,
        googleAuth
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
