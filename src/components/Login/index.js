import React, { useEffect } from "react";
import { initializeApp } from "firebase/app"
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import { useDispatch } from 'react-redux';
import { setAlertObj } from "../../redux/counterSlice";
import AlertCompo from "../Alert";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

const LoginCompo = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    // Fetching UserData from sessionStorage
    const userData =
        typeof sessionStorage !== "undefined" &&
        JSON.parse(sessionStorage.getItem("userData"));


    useEffect(() => {
        if (userData) {
            navigate("/Products");
        }
        // eslint-disable-next-line
    }, [])

    const signInWithGoogle = () => {
        const firebaseConfig = {
            apiKey: "AIzaSyDo2ZQnpyP_K4Em2F4B3Gt06LWlWDydTQ0",
            authDomain: "fir-337c6.firebaseapp.com",
            projectId: "fir-337c6",
            storageBucket: "fir-337c6.appspot.com",
            messagingSenderId: "246295619382",
            appId: "1:246295619382:web:96ff7d93a7e3981fabf597",
            measurementId: "G-CSVY9JXFQH"
        };
        // Initialize Firebase
        const app = initializeApp(firebaseConfig)

        const auth = getAuth(app)

        const provider = new GoogleAuthProvider()

        signInWithPopup(auth, provider)
            .then(result => {
                if (result?._tokenResponse.emailVerified) {
                    dispatch(setAlertObj({
                        alertOpen: true,
                        alertType: "success",
                        alertMessage: `Hello ${result?._tokenResponse.displayName}`
                    }));
                    typeof sessionStorage !== `undefined` &&
                        sessionStorage.setItem("userData", JSON.stringify(result._tokenResponse))
                    navigate("/Products");
                }
            })
            .catch(error => {
                console.log("error", error);
            })
    }
    return (
        <Container maxWidth="sm" sx={{
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: '100vh'
        }}>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                    my: 3,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'BLUE',
                    textDecoration: 'none',
                }}
            >
                STARWARS PORTAL LOGIN
            </Typography>
            <Button variant="contained" onClick={signInWithGoogle} startIcon={<GoogleIcon />}>
                Login With Google
            </Button>
            {/* Alert modal */}
            <AlertCompo />
        </Container>
    )
}

export default LoginCompo;